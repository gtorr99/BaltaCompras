import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@models/enum/column-mode.enum';
import { Router } from '@angular/router';
import { Fornecedor } from '@models/fornecedor.model';
import { FornecedorService } from '@services/fornecedor.service';
import { Filter, FilterType, SearchMap } from '@shared/components';
import { Page } from '@models/page.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { StatusEnum } from '@models/enum';

@Component({
  selector: 'app-fornecedor-tabela',
  templateUrl: './fornecedor-tabela.component.html',
  styleUrls: ['./fornecedor-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FornecedorTabelaComponent implements OnInit {

  // Filtros
  textOptions: SearchMap[] = [];
  filters: Filter[] = [];
  query: string = '';
  filterQuery: string = '';
  sortQuery: string = '';
  defaultStatus: string = '';

  // Tabela
  @ViewChild('myTable') table: any;
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

  expandRow(row) {
    this.table.rowDetail.collapseAllRows(row);
    this.table.rowDetail.toggleExpandRow(row);
    console.log(row);
    //Your code goes here - calling API 
  }

  collapseRow() {
    this.table.rowDetail.collapseAllRows();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  getWindowSize() {
    return window.innerWidth > 800;
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
        label: "Nome",
        value: "nomeFantasia"
      },
      {
        label: "CNPJ",
        value: "cnpj"
      }
    ];

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

  filtrar(filtro: string) {
    this.loading = true;
    this.filterQuery = filtro;
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

  getRowClass(row) {
    return {
      'table-row': true
    };
  }

  getRowId(row) {
  return row.guid;
}

  onDownload() {

  }

  statusColor: string = 'default';
  setStatusTag(status: any): string {
    this.statusColor = 'default'
    switch (status) {
      case StatusEnum[StatusEnum.ATIVO]:
      case StatusEnum[StatusEnum.CONCLUIDO]:
        this.statusColor = 'success';
        break;
      case StatusEnum[StatusEnum.CANCELADO]:
      case StatusEnum[StatusEnum.REPROVADO]:
        this.statusColor = 'danger';
        break;
      case StatusEnum[StatusEnum.EM_PROCESSAMENTO]:
        this.statusColor = 'orange';
        break;
      case StatusEnum[StatusEnum.ABERTO]:
        this.statusColor = 'warning';
        break;
      case StatusEnum[StatusEnum.APROVADO]:
        this.statusColor = 'primary';
        break;
      default:
        break;
    }
    return this.statusColor;
  }

  private setQuery() {
    let params = [];
    params.push(this.defaultStatus);
    params.push(this.filterQuery);
    params.push(this.sortQuery);
    this.query = params.join('&');
  }
}
