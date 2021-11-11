import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@models/enum/column-mode.enum';
import { Router } from '@angular/router';
import { Fornecedor } from '@models/fornecedor.model';
import { FornecedorService } from '@services/fornecedor.service';
import { Filter, FilterType, SearchMap } from '@shared/components';
import { TableStructure } from '@shared/components/table/table-structure.model';
import { Page } from '@models/page.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-fornecedor-tabela',
  templateUrl: './fornecedor-tabela.component.html',
  styleUrls: ['./fornecedor-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FornecedorTabelaComponent implements OnInit {
  getRowClass = (row) => {
    return {
      'row-color': true
    };
  }
  tabelaRequisicao: TableStructure
  textOptions: SearchMap[] = [];
  filterOptions: Filter[] = [];
  query: string = '';
  filterQuery: string = '';
  sortQuery: string = '';
  defaultStatus: string = 'status=ATIVO';

  page: Page<Fornecedor> = new Page<Fornecedor>();
  rows = new Array<Fornecedor>();
  ColumnMode = ColumnMode;
  loading: boolean = false;
  messages = {
    emptyMessage: 'Nenhum registro encontrado',
    // Footer total message
    totalMessage: 'resultados',
    // Footer selected message
    selectedMessage: 'selected'
  }

  private modalRef: NgbModalRef;

  constructor(
    private fornecedorService: FornecedorService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.page.page = 0;
    this.textOptions = [
      {
        label: "CNPJ",
        value: "cnpj"
      },
      {
        label: "Nome",
        value: "nomeFantasia"
      }
    ];

    this.filterOptions = [
      {
        label: "Data registo",
        type: FilterType.DATE
      },
      {
        label: "Grupo produto",
        type: FilterType.DROPDOWN,
        options: [
          { label: "Grupo produto", value: "" },
          { label: "Eletrônicos", value: "eletronicos" },
          { label: "Material de limpeza", value: "materialLimpeza" }
        ]
      },
    ]

    this.carregarTabela(0);
  }

  carregarTabela(pageEvent: any = null) {
    this.setQuery();
    this.fornecedorService.listarPaginado(this.query, pageEvent?.offset ?? 0).subscribe((response: Page<Fornecedor>) => {
      this.atualizarTabela(response);
    });
  }

  atualizarTabela(response: Page<Fornecedor>) {
    this.page = response;
    this.rows = [...response.content];
    this.loading = false;
  }

  ordenar(event: any) {
    this.loading = true;

    let s = event.sorts[0];
    this.sortQuery = `sort=${s.prop},${s.dir}`;
    this.setQuery();

    this.carregarTabela();
  }

  onEditarFornecedor(fornecedor: Fornecedor = null) {
    this.fornecedorService.fornecedorSelecionado = fornecedor ?? new Fornecedor(); 
    this.router.navigate(['/fornecedor/registrar']);
  }

  onRegistrarFornecedor() {
    this.fornecedorService.fornecedorSelecionado = new Fornecedor();
    this.router.navigate(['/fornecedor/registrar']);
  }

  onExcluirFornecedor(fornecedor: Fornecedor) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Excluir fornecedor";
    this.modalRef.componentInstance.message = "Ao prosseguir, o fornecedor será excluído. Você tem certeza que deseja prosseguir?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.fornecedorService.excluir(fornecedor.id).subscribe(() => {
          this.toastrService.success("Fornecedor excluído!");
          this.carregarTabela();
        });
      }
    });
  }

  getListaProdutos(forn: Fornecedor): string {
    return forn.gruposProduto.map(gp => gp.descricao).join(", ");
  }

  onDownload() {

  }

  private setQuery() {
    let params = [];
    params.push(this.defaultStatus);
    params.push(this.filterQuery);
    params.push(this.sortQuery);
    this.query = params.join('&');
  }
}
