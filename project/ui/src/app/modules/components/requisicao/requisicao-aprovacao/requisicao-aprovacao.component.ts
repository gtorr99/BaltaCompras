import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@models/enum/column-mode.enum';
import { Router } from '@angular/router';
import { Requisicao, Produto } from '@models/index';
import { RequisicaoService } from '@services/requisicao.service';
import { Page } from '@models/page.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { StatusEnum, UnMedidaEnum } from '@models/enum';
import { Atributo, TipoFiltro } from '@shared/components';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-requisicao-aprovacao',
  templateUrl: './requisicao-aprovacao.component.html',
  styleUrls: ['./requisicao-aprovacao.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequisicaoAprovacaoComponent implements OnInit {
  
  // Filtros
  atributosPesquisa: Atributo[] = [];
  query: string = '';
  filterQuery: string = '';
  sortQuery: string = '';
  defaultStatus: string = 'status=ABERTO';

  // Tabela
  @ViewChild('myTable') table: any;
  page: Page<Requisicao> = new Page<Requisicao>();
  rows = new Array<Requisicao>();
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
    private requisicaoService: RequisicaoService,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.usuarioService.getUsuarioLogado()) {
      if (this.usuarioService.verificarPermissao("Aprovar requisição")) {
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
        nome: "Nº Requisição",
        atributo: "id",
        tipo: TipoFiltro.NUMBER
      },
      {
        nome: "Data solicitação",
        atributo: "data",
        tipo: TipoFiltro.DATE
      },
      {
        nome: "Prazo",
        atributo: "prazo",
        tipo: TipoFiltro.DATE
      },
      {
        nome: "Status",
        atributo: "status",
        tipo: TipoFiltro.STATUS
      },
      {
        nome: "Requisitante",
        atributo: "usuario",
        tipo: TipoFiltro.STRING
      }
    ];

    this.page.page = 0;
    this.carregarTabela(0);
  }

  carregarTabela(pageEvent: any = null) {
    this.setQuery();
    this.requisicaoService.listarPaginado(this.query, pageEvent?.offset ?? 0).subscribe((response: Page<Requisicao>) => {
      this.atualizarTabela(response);
    });
  }

  atualizarTabela(response: Page<Requisicao>) {
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

  onAprovarRequisicao(req: Requisicao) {
    this.requisicaoService.aprovar(req.id).subscribe(() => {
      this.carregarTabela();
      this.toastrService.success("Requisição aprovada!");
    });
  }

  onReprovarRequisicao(req: Requisicao) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Cancelar requisição";
    this.modalRef.componentInstance.message = "Ao prosseguir, a requisição será cancelada. Você tem certeza que deseja prosseguir?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.requisicaoService.reprovar(req.id).subscribe(() => {
          this.carregarTabela();
          this.toastrService.success("Requisição reprovada!");
        });
      }
    });
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

  getUnMedida(produto: Produto): string {
    return UnMedidaEnum[produto.unMedida];
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
    params.push(this.defaultStatus);
    this.query = params.join('&');
    console.log(this.query);
  }
}
