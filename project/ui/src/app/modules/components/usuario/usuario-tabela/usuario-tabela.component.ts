import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@models/enum/column-mode.enum';
import { Router } from '@angular/router';
import { Usuario } from '@models/usuario.model';
import { UsuarioService } from '@services/usuario.service';
import { Page } from '@models/page.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { StatusEnum } from '@models/enum';
import { Atributo, TipoFiltro } from '@shared/components/filter/filter-select/filter.model';
import { UsuarioComponent } from '../usuario.component';
import { Funcao } from '@models/funcao.model';
import { Permissao } from '@models/permissao.model';
import { Setor } from '@models/setor.model';
import { CentroCusto } from '@models/centro-custo.model';

@Component({
  selector: 'app-usuario-tabela',
  templateUrl: './usuario-tabela.component.html',
  styleUrls: ['./usuario-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsuarioTabelaComponent implements OnInit {

  // Filtros
  atributosPesquisa: Atributo[] = [];
  query: string = '';
  filterQuery: string = '';
  sortQuery: string = '';

  // Tabela
  @ViewChild('myTable') table: any;
  page: Page<Usuario> = new Page<Usuario>();
  rows = new Array<Usuario>();
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
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.usuarioService.getUsuarioLogado()) {
      if (this.usuarioService.verificarPermissao("Administrador")) {
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
        atributo: "nome",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Email",
        atributo: "email",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Status",

        atributo: "status",
        tipo: TipoFiltro.STATUS
      },
      {
        nome: "Setor",
        atributo: "setor",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Função",
        atributo: "funcao",
        tipo: TipoFiltro.STRING
      }
    ];

    this.page.page = 0;
    // this.carregarTabela(0);
    this.fakeData();
  }

  carregarTabela(pageEvent: any = null) {
    this.setQuery();
    this.usuarioService.listarPaginado(this.query, pageEvent?.offset ?? 0).subscribe((response: Page<Usuario>) => {
      this.atualizarTabela(response);
    });
  }

  atualizarTabela(response: Page<Usuario>) {
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

  onAlterar(usuario: Usuario) {
    if (this.usuarioService.verificarPermissao("Administrador")) {
      this.modalRef = this.modalService.open(UsuarioComponent, {size: 'md'});
      this.modalRef.componentInstance.usuario = usuario;
    }
  }

  onNovo() {
    if (this.usuarioService.verificarPermissao("Administrador")) {
      this.modalRef = this.modalService.open(UsuarioComponent, { size: 'md' });
    }
  }

  onSalvar() {}

  onExcluir(usuario: Usuario) {
    if (this.usuarioService.verificarPermissao("Administrador")) {
      this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
      this.modalRef.componentInstance.title = "Excluir usuário";
      this.modalRef.componentInstance.message = "Ao prosseguir, o fornecedor será excluído. Você tem certeza que deseja prosseguir?";
      this.modalRef.closed.subscribe(response => {
        if (response) {
          this.usuarioService.excluir(usuario.id).subscribe(() => {
            this.toastrService.success("Usuário excluído!");
            this.carregarTabela();
          });
        }
      });
    }
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

  fakeData() {
    this.page = {
      page: 0,
      size: 10,
      totalElements: 3,
      totalPages: 1,
      content: [
        new Usuario({
          id: 1,
          nome: 'Jhonatan Leite',
          email: 'jhonatan.leite@baltacompras.com.br',
          status: StatusEnum[StatusEnum.ATIVO],
          setor: new Setor({
            id: 1,
            descricao: 'Compras',
            centrosCusto: [
              new CentroCusto({
              id: 1,
              descricao: "Controle de Compras"
            })
            ]
          }),
          funcao: new Funcao({
            id: 1,
            descricao: 'Comprador',
            permissoes: [
                new Permissao({
                id: 1,
                descricao: 'Visualizar cotação'
              }),
                new Permissao({
                id: 2,
                descricao: 'Editar cotação'
              }),
                new Permissao({
                id: 3,
                descricao: 'Visualizar requisição'
              }),
                new Permissao({
                id: 4,
                descricao: 'Editar requisição'
              }),
            ]
          })
        }),
        new Usuario({
          id: 2,
          nome: 'Cauê Sampaio',
          email: 'caue.sampaio@baltacompras.com.br',
          status: StatusEnum[StatusEnum.ATIVO],
          setor: new Setor({
            id: 1,
            descricao: 'Compras',
            centrosCusto: [
              new CentroCusto({
              id: 1,
              descricao: "Controle de Compras"
            })
            ]
          }),
          funcao: new Funcao({
            id: 1,
            descricao: 'Comprador',
            permissoes: [
                new Permissao({
                id: 1,
                descricao: 'Visualizar cotação'
              }),
                new Permissao({
                id: 2,
                descricao: 'Editar cotação'
              }),
                new Permissao({
                id: 3,
                descricao: 'Visualizar requisição'
              }),
                new Permissao({
                id: 4,
                descricao: 'Editar requisição'
              }),
            ]
          })
        }),
        new Usuario({
          id: 3,
          nome: 'Gabriel Torres',
          email: 'gabriel.torres@baltacompras.com.br',
          status: StatusEnum[StatusEnum.ATIVO],
          setor: new Setor({
            id: 1,
            descricao: 'Compras',
            centrosCusto: [
              new CentroCusto({
              id: 1,
              descricao: "Controle de Compras"
            })
            ]
          }),
          funcao: new Funcao({
            id: 1,
            descricao: 'Comprador',
            permissoes: [
                new Permissao({
                id: 1,
                descricao: 'Visualizar cotação'
              }),
                new Permissao({
                id: 2,
                descricao: 'Editar cotação'
              }),
                new Permissao({
                id: 3,
                descricao: 'Visualizar requisição'
              }),
                new Permissao({
                id: 4,
                descricao: 'Editar requisição'
              }),
            ]
          })
        })
      ]
    };
    this.rows = [...this.page.content];
  }
}
