import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@models/enum/column-mode.enum';
import { Router } from '@angular/router';
import { Cotacao, GrupoCotacao, Fornecedor, Usuario, GrupoProduto } from '@models/index';
import {GrupoCotacaoService } from '@services/grupo-cotacao.service';
import { Page } from '@models/page.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { StatusEnum, UnMedidaEnum } from '@models/enum';
import { Atributo, TipoFiltro } from '@shared/components';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-grupo-cotacao-tabela',
  templateUrl: './grupo-cotacao-tabela.component.html',
  styleUrls: ['./grupo-cotacao-tabela.component.scss'],
  providers: [
    CurrencyPipe
  ],
  encapsulation: ViewEncapsulation.None
})
export class GrupoCotacaoTabelaComponent implements OnInit {
  
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
    private grupoCotacaoService: GrupoCotacaoService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atributosPesquisa = [
      {
        nome: "Nº Grupo cotação",
        atributo: "id",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Data criação",
        atributo: "data",
        tipo: TipoFiltro.DATE
      },
      {
        nome: "Prazo solicitado",
        atributo: "prazoSolicitado",
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
  }

  carregarTabela(pageEvent: any = null) {
    this.setQuery();
    this.grupoCotacaoService.listarPaginado(this.query, pageEvent?.offset ?? 0).subscribe((response: Page<GrupoCotacao>) => {
      this.atualizarTabela(response);
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
    this.grupoCotacaoService.grupoCotacaoSelecionado = grupoCotacao;
    this.router.navigate(['/grupo-cotacao/cotacao']);
  }

  onGerarCotacoes() {
    this.grupoCotacaoService.gerarCotacoes().subscribe(() => {
      this.carregarTabela();
      this.toastrService.success("Cotações gerados com sucesso!");
    });
  }

  onCancelar(grupoCotacao: GrupoCotacao) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Cancelar grupo cotação";
    this.modalRef.componentInstance.message = "Ao prosseguir, o grupo e suas cotações serão cancelados. Você tem certeza que deseja prosseguir?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.grupoCotacaoService.cancelar(grupoCotacao.id).subscribe(() => {
          this.toastrService.success("Cotações canceladas!");
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

  getCotacaoSelecionada(gc: GrupoCotacao) {
    return gc.cotacoes.find(c => c.selecionada);
  }

    onTransformarValor(valor: number): string {
      return this.currencyPipe.transform(valor, 'BRL', 'R$', '1.2-2', 'pt');
    }

  calcularTotalCotacaoSelecionada(gc: GrupoCotacao): string {
    let total = 0;    
    let cotacaoSelecionada = gc?.cotacoes.find(c => c.selecionada);
    cotacaoSelecionada?.produtos.forEach(p => {
      total += parseFloat(p.precoUnitario.toString()) * p.grupoCotacaoProduto.quantidadeTotal;
    });
    total += cotacaoSelecionada?.frete;
    total -= cotacaoSelecionada?.desconto;
    return this.onTransformarValor(total);
  }
}
