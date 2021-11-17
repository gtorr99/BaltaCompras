import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@models/enum/column-mode.enum';
import { Router } from '@angular/router';
import { Produto, Fornecedor, Usuario, GrupoProduto, Cotacao } from '@models/index';
import { OrdemCompraService } from '@services/ordem-compra.service';
import { Page } from '@models/page.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { StatusEnum, UnMedidaEnum } from '@models/enum';
import { Atributo, TipoFiltro } from '@shared/components';
import { ProdutoService } from '@services/produto.service';
import { ProdutoComponent } from '../produto.component';

@Component({
  selector: 'app-produto-tabela',
  templateUrl: './produto-tabela.component.html',
  styleUrls: ['./produto-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProdutoTabelaComponent implements OnInit {
  
  // Filtros
  atributosPesquisa: Atributo[] = [];  
  query: string = '';
  filterQuery: string = '';
  sortQuery: string = '';
  defaultStatus: string = '';

  // Tabela
  @ViewChild('myTable') table: any;
  page: Page<Produto> = new Page<Produto>();
  rows = new Array<Produto>();
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
    private produtoService: ProdutoService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atributosPesquisa = [
      {
        nome: "Código",
        atributo: "id",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Descrição",
        atributo: "descricao",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Grupo produto",
        atributo: "grupoProduto",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Un. Medida",
        atributo: "unMedida",
        tipo: TipoFiltro.STRING
      }
    ];

    this.page.page = 0;
    this.carregarTabela(0);

    this.loadFake();
  }

  carregarTabela(pageEvent: any = null) {
    this.setQuery();
    // this.produtoService.listarPaginado(this.query, pageEvent?.offset ?? 0).subscribe((response: Page<Produto>) => {
      // this.atualizarTabela(response);
    // });
  }

  atualizarTabela(response: Page<Produto>) {
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

  onNovoProduto() {
    this.modalRef = this.modalService.open(ProdutoComponent, {size: 'md'});
    this.modalRef.closed.subscribe(produto => {
      this.produtoService.salvar(produto).subscribe(() => this.toastrService.success("Novo produto salvo com sucesso!"));
    })
  }

  onEditar(produto: Produto = null) {
    this.modalRef = this.modalService.open(ProdutoComponent, { size: 'md' });
    this.modalRef.componentInstance.produto = produto;
    this.modalRef.closed.subscribe(produto => {
      this.produtoService.salvar(produto).subscribe(() => this.toastrService.success("Produto alterado com sucesso!"));
    })
  }

  onExcluir(produto: Produto) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Excluir produto";
    this.modalRef.componentInstance.message = "Ao prosseguir, o produto será excluído. Você tem certeza que deseja prosseguir?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.produtoService.excluir(produto.id).subscribe(() => {
          this.toastrService.success("Produto excluído!");
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
      totalElements: 4,
      totalPages: 1,
      content: [
        new Produto({
          id: 1,
          descricao: 'Teclado DELL KB216',
          grupoProduto: new GrupoProduto({
            id: 1,
            descricao: 'Eletrônicos'
          }),
          unMedida: UnMedidaEnum[UnMedidaEnum.un]
        }),
        new Produto({
          id: 2,
          descricao: 'SSD Kingston - 256GB',
          grupoProduto: new GrupoProduto({
            id: 1,
            descricao: 'Eletrônicos'
          }),
          unMedida: UnMedidaEnum[UnMedidaEnum.un]
        }),
        new Produto({
          id: 3,
          descricao: 'Água sanitária',
          grupoProduto: new GrupoProduto({
            id: 2,
            descricao: 'Material de limpeza'
          }),
          unMedida: UnMedidaEnum[UnMedidaEnum.L]
        }),
        new Produto({
          id: 4,
          descricao: 'Álcool gel',
          grupoProduto: new GrupoProduto({
            id: 2,
            descricao: 'Material de limpeza'
          }),
          unMedida: UnMedidaEnum[UnMedidaEnum.L]
        }),
      ]
    }
    this.rows = [...this.page.content];
  }
}
