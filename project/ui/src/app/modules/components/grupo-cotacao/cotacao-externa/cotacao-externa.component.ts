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
  RequisicaoProduto
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
        console.log(this.cotacao);
        if (!this.cotacao.produtos) {
          this.router.navigate(['**']);
        } else {
          this.titulo = "Bem vindo, " + this.cotacao.fornecedor.nomeFantasia + "!";
          this.cotacao.produtos.forEach(p => {
            p = new GrupoCotacaoProdutoCotacao(p);
            p.inputing = false;
            p.precoUnitario = this.converterValorParaStringFloat(p);
            this.converterValorParaStringMoeda(p);

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

  converterValorParaStringFloat(gcpc: GrupoCotacaoProdutoCotacao): string {
    gcpc.inputing = true;
    if (gcpc.precoUnitario) {
      let v = gcpc.precoUnitario.toString();
      v = v.replace('R$', '');
      v = v.replace(' ', '');
      v = v.replace('.', '');
      gcpc.precoUnitario = v;
      return gcpc.precoUnitario.toString();
    }
    return '';
  }

  converterValorParaStringMoeda(gcpc: GrupoCotacaoProdutoCotacao) {
    gcpc.inputing = false;
    let v = gcpc.precoUnitario.toString();
    v = v.replace(',', '.');
    v = v.replace(' ', '');
    gcpc.precoUnitario = parseFloat(v);
    gcpc.precoUnitario = this.currencyPipe.transform(gcpc.precoUnitario, 'BRL', 'R$', '1.2-2', 'pt');
  }

  transformarValor(valor: number | string): string {
    return this.currencyPipe.transform(valor, 'BRL', 'R$', '1.2-2', 'pt');
  }

  converterValorParaStringFloatFrete(): string {
    this.freteInputing = true;
    if (this.cotacao.frete) {
      let v = this.cotacao.frete.toString();
      v = v.replace('R$', '');
      v = v.replace(' ', '');
      v = v.replace('.', '');
      this.cotacao.frete = v;
      return this.cotacao.frete.toString();
    }
    return '';
  }

  converterValorParaStringMoedaFrete() {
    this.freteInputing = false;
    let v = this.cotacao.frete.toString();
    v = v.replace(',', '.');
    v = v.replace(' ', '');
    this.cotacao.frete = parseFloat(v);
    this.cotacao.frete = this.currencyPipe.transform(this.cotacao.frete, 'BRL', 'R$', '1.2-2', 'pt');
  }

  transformarValorFrete(): string {
    return this.currencyPipe.transform(this.cotacao.frete, 'BRL', 'R$', '1.2-2', 'pt');
  }

  converterValorParaStringFloatDesconto(): string {
    this.descontoInputing = true;
    if (this.cotacao.desconto) {
      let v = this.cotacao.desconto.toString();
      v = v.replace('R$', '');
      v = v.replace(' ', '');
      v = v.replace('.', '');
      this.cotacao.desconto = v;
      return this.cotacao.desconto.toString();
    }
    return '';
  }

  converterValorParaStringMoedaDesconto() {
    this.descontoInputing = false;
    let v = this.cotacao.desconto.toString();
    v = v.replace(',', '.');
    v = v.replace(' ', '');
    this.cotacao.desconto = parseFloat(v);
    this.cotacao.desconto = this.currencyPipe.transform(this.cotacao.desconto, 'BRL', 'R$', '1.2-2', 'pt');
  }

  transformarValorDesconto(): string {
    return this.currencyPipe.transform(this.cotacao.desconto, 'BRL', 'R$', '1.2-2', 'pt');
  }

  onSalvar(event: any) {
    this.cotacao.produtos.forEach(p => {
      p.precoUnitario = this.converterValorParaStringFloat(p);
      p.precoUnitario = parseFloat(p.precoUnitario.toString());
    });
    this.cotacao.observacoes = this.cotacaoExternaForm.get('observacoes').value;
    this.cotacao.prazo = this.converterNgbDateStructParaDate(this.cotacaoExternaForm.get('prazoFornecedor').value);
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

  calcularTotalCotacao(cot: Cotacao): string {
    let total = 0;
    cot.produtos?.forEach(p => {
      total += parseFloat(this.converterValorParaStringFloat(p)) * p.grupoCotacaoProduto.quantidadeTotal;
    });
    total += parseFloat(cot.frete.toString());
    total -= parseFloat(cot.desconto.toString());
    return this.transformarValor(total);
  }

  getProdutoSubTotal(produtoCotado: GrupoCotacaoProdutoCotacao): string {
    this.converterValorParaStringFloat(produtoCotado);
    return this.transformarValor(parseFloat(this.converterValorParaStringFloat(produtoCotado)) * produtoCotado.grupoCotacaoProduto.quantidadeTotal);
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