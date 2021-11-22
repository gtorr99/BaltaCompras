import { Component, OnInit } from '@angular/core';
import { GrupoCotacaoService } from '@services/grupo-cotacao.service';
import { ProdutoService } from '@services/produto.service';
import { NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Produto,
  Cotacao,
  GrupoCotacao,
  Fornecedor,
  RequisicaoProduto,
  Usuario
} from '@models/index';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FornecedorService } from '@services/fornecedor.service';
import { UnMedidaEnum } from '@models/enum';
import { Email } from '@models/email.model';
import { EmailComponent } from '@shared/components/email/email.component';
import { Subscription } from 'rxjs';
import { GrupoCotacaoProduto } from '@models/grupo-cotacao/grupo-cotacao-produto.model';
import { GrupoCotacaoProdutoCotacao } from '@models/grupo-cotacao/grupo-cotacao-produto-cotacao.model';

@Component({
  selector: 'app-cotacao-externa',
  templateUrl: './cotacao-externa.component.html',
  styleUrls: ['./cotacao-externa.component.scss'],
  providers: [
    CurrencyPipe
  ]
})
export class CotacaoExternaComponent implements OnInit {

  titulo: string;
  cotacaoExternaForm: FormGroup;
  cotacao: Cotacao = new Cotacao();
  grupoCotacao: GrupoCotacao = new GrupoCotacao();
  hoje: NgbDateStruct = this.converterDateParaNgbDateStruct(new Date());
  freteInputing: boolean = false;
  descontoInputing: boolean = false;
  formasPgto: any[] = [];

  mapProdutos: Map<number, { produto: Produto, quantidadeTotal: number }> = new Map();

  /* Filtro */
  query: string = '';
  email: Email;
  prazo = new Date();
  disponibilidadeLista = [{ nome: 'Disponível', id: true}, {nome: 'Indisponível', id: false}];

  private modalRef: NgbModalRef;
  private routeSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private grupoCotacaoService: GrupoCotacaoService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let id = null;
    this.routeSub = this.route.params.subscribe(params => {
      id = params['id'];
      if (id == null) {
        this.router.navigate(['**']);
      }
      this.grupoCotacaoService.getCotacaoById(id).subscribe(cot => {
        this.cotacao = new Cotacao(cot[0]);
        if (!this.cotacao.produtos) {
          this.router.navigate(['**']);
        } else {
          this.titulo = "Bem vindo, " + this.cotacao.fornecedor.nomeFantasia + "!";
          this.cotacao.produtos.forEach(p => {
            p = new GrupoCotacaoProdutoCotacao(p);

            p.grupoCotacaoProduto = new GrupoCotacaoProduto(p.grupoCotacaoProduto);
            p.grupoCotacaoProduto.requisicaoProduto.forEach(rp => rp = new RequisicaoProduto(rp));

            p.grupoCotacaoProduto.requisicaoProduto.forEach(reqProd => {
              this.mapProdutos.set(reqProd.produto.id, { produto: new Produto(reqProd.produto), quantidadeTotal: p.grupoCotacaoProduto.quantidadeTotal });
            });
          });
        }
      });
    });

    this.cotacaoExternaForm = this.formBuilder.group({
      prazoFornecedor: ['', Validators.required],
      observacoes: ['', Validators.maxLength(65.000)]
    });
  }

  getProdutos() {
    return Array.from(this.mapProdutos.values());
  }

  onSalvar(event: any) {
    this.cotacao.observacoes = this.cotacaoExternaForm.get('observacoes').value;
    this.cotacao.prazo = this.converterNgbDateStructParaDate(this.cotacaoExternaForm.get('prazoFornecedor').value);
    this.cotacao.formasPgto = this.formasPgto.map(f => f.label).join(', ');
    this.grupoCotacaoService.alterarCotacao(this.cotacao).subscribe(() => {
      this.toastrService.success("Cotação enviada com sucesso!");
    });
  }

  onRestaurar(event: any) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Restaurar formulário";
    this.modalRef.componentInstance.message = "Todas as alterações serão perdidas. Você tem certeza que deseja restaurar?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.cotacaoExternaForm.reset();
        this.cotacao.produtos.forEach(p => {
            p.aliquotaIpi = 0;
            p.precoUnitario = 0;
            p.disponivel = true;
          });
      }
    });
  }

  calcularTotalCotacao(cot: Cotacao): number {
    let total = 0;
    cot.produtos?.forEach(p => {
      total += p.precoUnitario * p.grupoCotacaoProduto?.quantidadeTotal;
    });
    total += cot.frete;
    total -= cot.desconto;
    return total;
  }

  getProdutoSubTotal(produtoCotado: GrupoCotacaoProdutoCotacao): number {
    return produtoCotado.precoUnitario * produtoCotado.grupoCotacaoProduto.quantidadeTotal;
  }

  getUnMedida(unMedida: UnMedidaEnum | string) {
    return UnMedidaEnum[unMedida];
  }

  verificarTamanhoTela(): boolean {
    return window.innerWidth >= 992;
  }

  onDateSelect(date: any | NgbDateStruct) {
    this.cotacaoExternaForm.get('prazoFornecedor').patchValue(date);
  }

  private converterNgbDateStructParaDate(ngbDate: NgbDateStruct): Date {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  private converterDateParaNgbDateStruct(date: Date): NgbDateStruct {
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }
}