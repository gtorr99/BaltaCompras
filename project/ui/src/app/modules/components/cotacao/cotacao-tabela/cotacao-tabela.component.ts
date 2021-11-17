import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@models/enum/column-mode.enum';
import { Router } from '@angular/router';
import { Cotacao, GrupoCotacao, Fornecedor, Usuario, GrupoProduto } from '@models/index';
import { CotacaoService } from '@services/cotacao.service';
import { Page } from '@models/page.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { StatusEnum, UnMedidaEnum } from '@models/enum';
import { Atributo, TipoFiltro } from '@shared/components';

@Component({
  selector: 'app-cotacao-tabela',
  templateUrl: './cotacao-tabela.component.html',
  styleUrls: ['./cotacao-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CotacaoTabelaComponent implements OnInit {
  
  // Filtros
  atributosPesquisa: Atributo[] = [];  
  query: string = '';
  filterQuery: string = '';
  sortQuery: string = '';
  defaultStatus: string = '';

  // Tabela
  @ViewChild('myTable') table: any;
  page: Page<GrupoCotacao> = new Page<GrupoCotacao>();
  rows = new Array<GrupoCotacao>();
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
    private cotacaoService: CotacaoService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atributosPesquisa = [
      {
        nome: "Nº Requisição",
        atributo: "id",
        tipo: TipoFiltro.STRING
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
        nome: "Comprador",
        atributo: "usuario",
        tipo: TipoFiltro.STRING
      }
    ];

    this.page.page = 0;
    this.carregarTabela(0);

    this.loadFake();
  }

  carregarTabela(pageEvent: any = null) {
    this.setQuery();
    this.cotacaoService.listarPaginado(this.query, pageEvent?.offset ?? 0).subscribe((response: Page<GrupoCotacao>) => {
      // this.atualizarTabela(response);
    });
  }

  atualizarTabela(response: Page<GrupoCotacao>) {
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

  onEditar(grupoCotacao: GrupoCotacao = null) {
    this.cotacaoService.grupoCotacaoSelecionado = grupoCotacao;
    this.router.navigate(['/cotacao/grupo-cotacao']);
  }

  onGerarCotacoes() {
    this.cotacaoService.gerarCotacoes().subscribe(() => this.carregarTabela());
  }

  onCancelar(grupoCotacao: GrupoCotacao) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Cancelar cotação";
    this.modalRef.componentInstance.message = "Ao prosseguir, a cotação será cancelada. Você tem certeza que deseja prosseguir?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.cotacaoService.cancelar(grupoCotacao.id).subscribe(() => {
          this.toastrService.success("Cotação cancelada!");
          this.carregarTabela();
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
    console.log(this.query);
  }

  loadFake() {
    this.page = {
      page: 0,
      size: 10,
      totalElements: 3,
      totalPages: 1,
      content: [
        new GrupoCotacao({
          id: 1,
          data: new Date(Date.parse('10/11/2021')),
          prazo: new Date(),
          status: StatusEnum[StatusEnum.ABERTO],
          observacoes: '',
          usuario: new Usuario({
            nome: "Jorge Ivel"
          }),
          grupoProduto: new GrupoProduto({
            descricao: 'Material de limpeza'
          })
        }),
        new GrupoCotacao({
          id: 2,
          data: new Date(Date.parse('10/11/2021')),
          prazo: new Date(),
          status: StatusEnum[StatusEnum.CONCLUIDO],
          observacoes: '',
          usuario: new Usuario({
            nome: "Caue Sampaio"
          }),
          fornecedorSelecionado: new Fornecedor({
            nomeFantasia: "Amazon Inc.",
            cnpj: '15.454.650/0001-84'
          }),
          grupoProduto: new GrupoProduto({
            descricao: 'Eletrônicos'
          }),
          cotacoes: [
            new Cotacao({
              prazoFornecedor: new Date(),
              status: StatusEnum.CONCLUIDO,
              observacoes: '',
              selecionada: true,
              fornecedor: new Fornecedor({
                nomeFantasia: 'Amazon Inc',
                cnpj: '15.454.650/0001-84'
              }),
              total: 500.00
            }),
            new Cotacao({
              prazoFornecedor: new Date(),
              status: StatusEnum.CONCLUIDO,
              observacoes: '',
              selecionada: false,
              fornecedor: new Fornecedor({
                nomeFantasia: 'Submarino',
                cnpj: '00.396.850/0001-50'
              }),
            }),
            new Cotacao({
              prazoFornecedor: new Date(Date.parse('11/20/2021')),
              status: StatusEnum.CONCLUIDO,
              observacoes: '',
              selecionada: false,
              fornecedor: new Fornecedor({
                nomeFantasia: 'Extra Hipermercado',
                cnpj: '51.072.275/0001-71'
              }),
            }),
          ]
        }),
        new GrupoCotacao({
          id: 3,
          prazo: new Date(),
          status: StatusEnum[StatusEnum.CANCELADO],
          usuario: new Usuario({
            nome: "Jhonatan Leite"
          }),
          fornecedorSelecionado: new Fornecedor({
            nomeFantasia: "Sony Inc."
          }),
          grupoProduto: new GrupoProduto({
            descricao: 'Eletrônicos'
          })
        })
      ]
    }
    this.rows = [...this.page.content];
  }

  getCotacaoSelecionada(gc: GrupoCotacao) {
    return gc.cotacoes.find(c => c.selecionada);
  }
}
