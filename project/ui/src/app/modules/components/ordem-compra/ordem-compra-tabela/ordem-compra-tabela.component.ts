import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@models/enum/column-mode.enum';
import { Router } from '@angular/router';
import { OrdemCompra, Fornecedor, Usuario, GrupoProduto, Cotacao } from '@models/index';
import { OrdemCompraService } from '@services/ordem-compra.service';
import { Page } from '@models/page.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { StatusEnum, UnMedidaEnum } from '@models/enum';
import { Atributo, TipoFiltro } from '@shared/components';
import { GrupoCotacaoProdutoCotacao } from '@models/grupo-cotacao/grupo-cotacao-produto-cotacao.model';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-ordem-compra-tabela',
  templateUrl: './ordem-compra-tabela.component.html',
  styleUrls: ['./ordem-compra-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrdemCompraTabelaComponent implements OnInit {
  
  // Filtros
  atributosPesquisa: Atributo[] = [];  
  query: string = '';
  filterQuery: string = '';
  sortQuery: string = '';
  defaultStatus: string = '';

  // Tabela
  @ViewChild('myTable') table: any;
  page: Page<OrdemCompra> = new Page<OrdemCompra>();
  rows = new Array<OrdemCompra>();
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

  mapProdutos: Map<number, ProdutoOrdem> = new Map();

  private modalRef: NgbModalRef;

  constructor(
    private ordemCompraService: OrdemCompraService,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.usuarioService.getUsuarioLogado()) {
      if (this.usuarioService.verificarPermissao("Ler ordem")) {
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
        nome: "Nº Ordem",
        atributo: "id",
        tipo: TipoFiltro.STRING
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
      },
      {
        nome: "Grupo produto",
        atributo: "grupoProduto",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Fornecedor",
        atributo: "fornecedor",
        tipo: TipoFiltro.STRING
      }
    ];

    this.page.page = 0;
    this.carregarTabela(0);
  }

  carregarTabela(pageEvent: any = null) {
    this.setQuery();
    this.ordemCompraService.listarPaginado(this.query, pageEvent?.offset ?? 0).subscribe((response: Page<OrdemCompra>) => {
      this.atualizarTabela(response);
    });
  }

  atualizarTabela(response: Page<OrdemCompra>) {
    this.page = response;
    this.rows = [...response.content];
    this.loading = false;
    this.rows.forEach(oc => {
      oc.cotacao.produtos.forEach(p => {
        p.grupoCotacaoProduto.requisicaoProduto.forEach(reqProd => {
          this.mapProdutos.set(reqProd.produto.id, new ProdutoOrdem({
            id: p.grupoCotacaoProduto.id,
            aliquotaIpi: parseFloat(p.aliquotaIpi.toString()),
            descricao: reqProd.produto.descricao,
            unMedida: this.getUnMedida(reqProd.produto.unMedida),
            quantidadeTotal: p.grupoCotacaoProduto.quantidadeTotal,
            precoUnitario: parseFloat(p.precoUnitario.toString()),
            subtotal: this.getProdutoSubTotal(p)
          }))
        })})
      });
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

  onCancelar(ordemCompra: OrdemCompra) {
    if (this.verificarPermissaoEditarCancelar(ordemCompra.usuario)) {
      this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
      this.modalRef.componentInstance.title = "Cancelar ordem de compra";
      this.modalRef.componentInstance.message = "Ao prosseguir, a ordem de compra será cancelada. Você tem certeza que deseja prosseguir?";
      this.modalRef.closed.subscribe(response => {
        if (response) {
          this.ordemCompraService.cancelar(ordemCompra.id).subscribe(() => {
            this.toastrService.success("Ordem cancelada!");
            this.carregarTabela();
          });
        }
      });
    }
  }

  verificarPermissaoEditarCancelar(usuario: Usuario): boolean {
    return this.usuarioService.getUsuarioLogado().id == usuario.id;
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

  getProdutos() {
    return Array.from(this.mapProdutos.values());
  }

  getGrupoProduto(ordemCompra: OrdemCompra): string {
    return ordemCompra.cotacao.produtos[0].grupoCotacaoProduto.requisicaoProduto[0].produto.grupoProduto.descricao;
  }

  calcularTotalCotacao(cot: Cotacao): number {
    let total = 0;
    cot.produtos?.forEach(p => {
      total += parseFloat(p.precoUnitario.toString()) * p.grupoCotacaoProduto.quantidadeTotal;
    });
    total += parseFloat(cot.frete.toString());
    total -= parseFloat(cot.desconto.toString());
    return total;
  }

  getProdutoSubTotal(produtoCotado: GrupoCotacaoProdutoCotacao): number {
    return parseFloat(produtoCotado.precoUnitario.toString()) * produtoCotado.grupoCotacaoProduto.quantidadeTotal;
  }

  getUnMedida(unMedida: UnMedidaEnum | string) {
    return UnMedidaEnum[unMedida];
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
}

class ProdutoOrdem {
  id: number;
  descricao: string;
  unMedida: string;
  precoUnitario: number;
  aliquotaIpi: number;
  quantidadeTotal: number;
  subtotal: number;

  constructor(data?: Partial<ProdutoOrdem>) {
    Object.assign(this, data);
  }
}
