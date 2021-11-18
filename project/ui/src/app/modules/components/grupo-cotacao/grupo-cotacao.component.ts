import { Component, OnInit } from '@angular/core';
import { GrupoCotacaoService } from '@services/grupo-cotacao.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { 
  Produto,
  GrupoProduto,
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
import { GrupoCotacaoProdutoCotacao } from '@models/grupo-cotacao/grupo-cotacao-produto-cotacao.model';
import { GrupoCotacaoProduto } from '@models/grupo-cotacao/grupo-cotacao-produto.model';

@Component({
  selector: 'app-grupo-cotacao',
  templateUrl: './grupo-cotacao.component.html',
  styleUrls: ['./grupo-cotacao.component.scss'],
  providers: [
    CurrencyPipe
  ]
})
export class GrupoCotacaoComponent implements OnInit {
  titulo: string;
  grupoCotacao: GrupoCotacao = new GrupoCotacao();
  grupoCotacaoForm: FormGroup;

  listaFornecedores: Fornecedor[] = [];
  listaFornecedoresEmCotacao: Fornecedor[] = [];

  mapProdutos: Map<number, { produto: Produto, quantidadeTotal: number }> = new Map();

  /* Filtro */
  query: string = '';

  email: Email;
  private modalRef: NgbModalRef;

  constructor(
    private grupoCotacaoService: GrupoCotacaoService,
    private fornecedorService: FornecedorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.grupoCotacaoService.grupoCotacaoSelecionado.grupoProduto) {
      this.router.navigate(['/grupo-cotacao']);
    } else {
      this.grupoCotacao = new GrupoCotacao(this.grupoCotacaoService.grupoCotacaoSelecionado);

      let fornecedorSelecionado = null;
      if (this.grupoCotacao?.cotacoes?.find(c => c.selecionada)?.fornecedor.nomeFantasia) {
        fornecedorSelecionado = this.grupoCotacao?.cotacoes?.find(c => c.selecionada)?.fornecedor.nomeFantasia;
      }

      this.grupoCotacaoForm = this.formBuilder.group({
        fornecedorSelecionado: [fornecedorSelecionado, Validators.required],
        observacoes: [this.grupoCotacao?.observacoes ?? '', Validators.maxLength(65.000)]
      });

      this.fornecedorService.listar(`grupoProduto=${this.grupoCotacaoService.grupoCotacaoSelecionado.grupoProduto?.descricao}`).subscribe((fornecedores: Fornecedor[]) => {
        this.listaFornecedores  = [...fornecedores.map(f => new Fornecedor(f))];
      });

      if (this.grupoCotacao?.cotacoes.length) {
        let lista = [];
        this.grupoCotacao.cotacoes?.forEach(c => { 
          c.produtos.forEach(p => {
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
          lista.push(c.fornecedor);
        });
        this.listaFornecedoresEmCotacao = [...lista];

      } else {
        this.grupoCotacao.grupoCotacaoProdutos = [...this.grupoCotacao.grupoCotacaoProdutos?.map(gcp => new GrupoCotacaoProduto(gcp))];
        
        this.grupoCotacao.cotacoes = [
          new Cotacao({
            desconto: 0,
            frete: 0,
            meioTransporte: '',
            transportadora: '',
            formasPgto: '',
            observacoes: '',
            prazo: null,
            selecionada: false,
            fornecedor: new Fornecedor(),

            produtos: [...this.grupoCotacao.grupoCotacaoProdutos.map(gcp => 
              new GrupoCotacaoProdutoCotacao({
                aliquotaIpi: 0,
                precoUnitario: 0,
                disponivel: true,
                grupoCotacaoProduto: gcp,
                inputing: false
              })
            )]
          }),
          new Cotacao({
            desconto: 0,
            frete: 0,
            meioTransporte: '',
            transportadora: '',
            formasPgto: '',
            observacoes: '',
            prazo: null,
            selecionada: false,
            fornecedor: new Fornecedor(),

            produtos: [...this.grupoCotacao.grupoCotacaoProdutos.map(gcp => 
              new GrupoCotacaoProdutoCotacao({
                aliquotaIpi: 0,
                precoUnitario: 'R$ 0,00',
                disponivel: true,
                grupoCotacaoProduto: gcp,
                inputing: false
              })
            )]
          })
        ];

        this.grupoCotacao.grupoCotacaoProdutos.forEach(gcp => {
          gcp.requisicaoProduto.forEach(rp => rp = new RequisicaoProduto(rp));

          gcp.requisicaoProduto.forEach(reqProd => {
            this.mapProdutos.set(reqProd.produto.id, { produto: new Produto(reqProd.produto), quantidadeTotal: gcp.quantidadeTotal });
          });
        });
      }
    }
  }

  getProdutos() {
    return Array.from(this.mapProdutos.values());
  }

  onAdicionarCotacao() {
    this.grupoCotacao.cotacoes.push(new Cotacao({
      desconto: 0,
      frete: 0,
      meioTransporte: '',
      transportadora: '',
      formasPgto: '',
      observacoes: '',
      prazo: null,
      selecionada: false,
      fornecedor: new Fornecedor(),

      produtos: [...this.grupoCotacao.grupoCotacaoProdutos.map(gcp =>
        new GrupoCotacaoProdutoCotacao({
          aliquotaIpi: 0,
          precoUnitario: 'R$ 0,00',
          disponivel: true,
          grupoCotacaoProduto: gcp,
          inputing: false
        })
      )]
    }));
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

  onSalvar(event: any) {
    if (event.type == "submit") {
      this.grupoCotacaoForm.markAllAsTouched();

    if (!this.grupoCotacaoForm.valid) {
      event.preventDefault();
      event.stopPropagation();
      this.toastrService.error("Todos os campos obrigatórios devem ser preenchidos");
    } else {
      this.grupoCotacao.cotacoes.forEach(c => {
        c.produtos.forEach(p => {
          p.id = { idCotacao: 1, idGrupoCotacaoProduto: this.grupoCotacao.id };
          p.precoUnitario = this.converterValorParaStringFloat(p);
          p.precoUnitario = parseFloat(p.precoUnitario.toString());
        });
        c.grupoCotacao = new GrupoCotacao({
          id: this.grupoCotacao.id,
          data: this.grupoCotacao.data,
          prazoSolicitado: this.grupoCotacao.prazoSolicitado,
          status: this.grupoCotacao.status,
          grupoProduto: new GrupoProduto(this.grupoCotacao.grupoProduto),
          grupoCotacaoProdutos: [...this.grupoCotacao.grupoCotacaoProdutos],
          observacoes: this.grupoCotacaoForm.get('observacoes').value,
          usuario: this.grupoCotacao.usuario
        });
        c.observacoes = this.grupoCotacaoForm.get('observacoes').value;
        c.selecionada = this.grupoCotacaoForm.get('fornecedorSelecionado').value == c.fornecedor.id;
        c.prazo = new Date();
        // c.fornecedor = this.listaFornecedores.find(f => f.id == this.grupoCotacaoForm.get('fornecedorSelecionado').value);
        console.log(c);
        
        this.grupoCotacaoService.salvarCotacao(c).subscribe(() => {
          this.toastrService.success("Cotações atualizadas!");
        });
      });
        this.router.navigate(['/grupo-cotacao']);
      }
    }
  }

  onCancelar(event: any) {
    event.preventDefault();
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Cancelar edição";
    this.modalRef.componentInstance.message = "Todas as alterações serão perdidas. Você tem certeza que deseja cancelar?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.router.navigate(['/grupo-cotacao']);
      }
    });
  }

  onRestaurar(event: any) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Restaurar formulário";
    this.modalRef.componentInstance.message = "Todas as alterações serão perdidas. Você tem certeza que deseja restaurar?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.grupoCotacaoForm.reset();
        this.grupoCotacao.cotacoes.forEach(c => {
            c.produtos.forEach(p => {
            p.aliquotaIpi = 0;
            p.precoUnitario = 0;
            p.disponivel = true;
          });
          c.fornecedor = new Fornecedor();
        });
      }
    });
  }

  onEnviarEmail() {
    this.construirEmail();
    this.modalRef = this.modalService.open(EmailComponent, { size: 'md' });
    this.modalRef.componentInstance.email = this.email;
    this.modalRef.closed.subscribe((email: Email) => {
      if (email) {
        this.email = email;
        this.toastrService.success("Email enviado!");
      }
    });
  }

  construirEmail() {
    this.email = new Email({
      subject: "BaltaCompras - Solicitação de cotação",
      mailTo: [...this.grupoCotacao.cotacoes.map(c => c.fornecedor.email), 'comprador@email.com'],
      text: "Prezado fornecedor,\n\nSolicito a cotação dos produtos listados para o referido prazo, contidos no link abaixo.\n\nAtte.,\nComprador."
    });
  }

  onSelecionarFornecedor() {
    // this.listaFornecedores = [...this.listaFornecedores];
    let list = [];
    this.listaFornecedoresEmCotacao = [];
    this.grupoCotacao.cotacoes.forEach(c => {
      list.push(c.fornecedor);
    });
    this.listaFornecedoresEmCotacao = [...list];
  }

  calcularTotalCotacao(cot: Cotacao): string {
    let total = 0;
    cot.produtos?.forEach(p => {
      total += parseFloat(this.converterValorParaStringFloat(p)) * p.grupoCotacaoProduto.quantidadeTotal;
    });
    total += cot.frete;
    total -= cot.desconto;
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
}