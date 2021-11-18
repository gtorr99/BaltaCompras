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

@Component({
  selector: 'app-ordem-compra-aprovacao',
  templateUrl: './ordem-compra-aprovacao.component.html',
  styleUrls: ['./ordem-compra-aprovacao.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrdemCompraAprovacaoComponent implements OnInit {
  
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

  private modalRef: NgbModalRef;

  constructor(
    private ordemCompraService: OrdemCompraService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atributosPesquisa = [
      {
        nome: "Nº Ordem",
        atributo: "id",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Data abertura",
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
      },
      {
        nome: "Grupo produto",
        atributo: "grupoProduto",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Tipo de compra",
        atributo: "tipoCompra",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Fornecedor",
        atributo: "fornecedor",
        tipo: TipoFiltro.STRING
      },
      {
        nome: "Total",
        atributo: "total",
        tipo: TipoFiltro.NUMBER
      }
    ];

    this.page.page = 0;
    this.carregarTabela(0);

  }

  carregarTabela(pageEvent: any = null) {
    this.setQuery();
    this.ordemCompraService.listarPaginado(this.query, pageEvent?.offset ?? 0).subscribe((response: Page<OrdemCompra>) => {
      // this.atualizarTabela(response);
    });
  }

  atualizarTabela(response: Page<OrdemCompra>) {
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

  onCancelar(ordemCompra: OrdemCompra) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Cancelar cotação";
    this.modalRef.componentInstance.message = "Ao prosseguir, a cotação será cancelada. Você tem certeza que deseja prosseguir?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.ordemCompraService.cancelar(ordemCompra.id).subscribe(() => {
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

  onAprovar(oc: OrdemCompra) {
    this.ordemCompraService.aprovar(oc.id).subscribe(() => this.carregarTabela());
  }

  onReprovar(oc: OrdemCompra) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Cancelar ordem de compra";
    this.modalRef.componentInstance.message = "Ao prosseguir, a requisição será cancelada. Você tem certeza que deseja prosseguir?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.ordemCompraService.reprovar(oc.id).subscribe(() => this.carregarTabela());
      }
    });
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
