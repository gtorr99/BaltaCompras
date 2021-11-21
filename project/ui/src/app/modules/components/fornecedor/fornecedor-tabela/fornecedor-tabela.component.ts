import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@models/enum/column-mode.enum';
import { Router } from '@angular/router';
import { Fornecedor } from '@models/fornecedor.model';
import { FornecedorService } from '@services/fornecedor.service';
import { Page } from '@models/page.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { StatusEnum } from '@models/enum';
import { Atributo, TipoFiltro } from '@shared/components/filter/filter-select/filter.model';
import { UsuarioService } from '@services/usuario.service';
import { Usuario } from '@models/usuario.model';

@Component({
  selector: 'app-fornecedor-tabela',
  templateUrl: './fornecedor-tabela.component.html',
  styleUrls: ['./fornecedor-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FornecedorTabelaComponent implements OnInit {

  // Filtros
  atributosPesquisa: Atributo[] = [];
  query: string = '';
  filterQuery: string = '';
  sortQuery: string = '';

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

  statusColor: string = 'default';

  private modalRef: NgbModalRef;

  constructor(
    private fornecedorService: FornecedorService,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.usuarioService.getUsuarioLogado()) {
      if (this.usuarioService.verificarPermissao("Ler fornecedor")) {
        this.carregarPagina();
      } else {
        this.router.navigate(['/acesso-negado']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  carregarPagina() {
    this.atributosPesquisa = [
      {
        nome: "Nome",
        atributo: "nomeFantasia",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Cnpj",
        atributo: "cnpj",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Status",
        atributo: "status",
        tipo: TipoFiltro.STATUS
      },
      {
        nome: "Email",
        atributo: "email",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Telefone",
        atributo: "telefone",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Grupo Produto",
        atributo: "grupoProduto",
        tipo: TipoFiltro.STRING
      }
    ];

    this.page.page = 0;
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
    if (this.usuarioService.verificarPermissao("Editar fornecedor")) {
      this.fornecedorService.fornecedorSelecionado = fornecedor ?? new Fornecedor(); 
      this.router.navigate(['/fornecedor/registrar']);
    }
  }

  onRegistrarFornecedor() {
    if (this.usuarioService.verificarPermissao("Editar requisição")) {
      this.fornecedorService.fornecedorSelecionado = new Fornecedor();
      this.router.navigate(['/fornecedor/registrar']);
    }
  }

  onExcluirFornecedor(fornecedor: Fornecedor) {
    if (this.usuarioService.verificarPermissao("Editar requisição")) {
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
  }

  verificarPermissaoEditar(): boolean {
    return this.usuarioService.verificarPermissao("Editar requisição");
  }

  getListaProdutos(forn: Fornecedor): string {
    return forn.gruposProduto.map(gp => gp.descricao).join(", ");
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  getWindowSize() {
    return window.innerWidth > 800;
  }

  getRowClass(row) {
    return {
      'table-row': true
    };
  }

  onDownload() {

  }

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
    params.push(this.filterQuery);
    params.push(this.sortQuery);
    this.query = params.join('&');
  }
}
