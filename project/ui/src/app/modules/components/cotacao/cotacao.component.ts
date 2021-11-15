import { Component, OnInit } from '@angular/core';
import { CotacaoService } from '@services/cotacao.service';
import { ProdutoService } from '@services/produto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { 
  Produto,
  Cotacao,
  GrupoCotacao,
  Fornecedor
} from '@models/index';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FornecedorService } from '@services/fornecedor.service';
import { UnMedidaEnum } from '@models/enum';
import { Email } from '@models/email.model';
import { EmailComponent } from '@shared/components/email/email.component';

@Component({
  selector: 'app-cotacao',
  templateUrl: './cotacao.component.html',
  styleUrls: ['./cotacao.component.scss'],
  providers: [
    CurrencyPipe
  ]
})
export class CotacaoComponent implements OnInit {

  titulo: string;
  grupoCotacao: GrupoCotacao = new GrupoCotacao();
  grupoCotacaoForm: FormGroup;
  listaCotacoes: Cotacao[] = [];
  listaFornecedores: Fornecedor[] = [];
  // listaProdutos: Produto[] = [];
  listaProdutos: number[] = [1,2,3,4,5];
  prazo = new Date();

  /* Filtro */
  query: string = '';

  valor: any;
  inputing: boolean = false;
  aliqIpi: any;
  email: Email;
  show = false;
  private modalRef: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private cotacaoService: CotacaoService,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.grupoCotacao = this.cotacaoService.grupoCotacaoSelecionado;
      
    this.grupoCotacaoForm = this.formBuilder.group({
      prazo: [this.grupoCotacao?.prazo, Validators.required],
      observacoes: [this.grupoCotacao.observacoes ?? '', Validators.maxLength(65.000)]
    });
    this.carregarProdutos();
  }

  carregarProdutos() {
    // this.produtoService.listar(this.query).subscribe((produtos: Produto[]) => {
    //   this.listaProdutos = [...produtos.map(p => new Produto(p))];
    // });
    // this.cotacaoService.listarCotacoesDoGrupo(this.grupoCotacao.id).subscribe((cotacoes: Cotacao[]) => {
    //   this.listaCotacoes = [...cotacoes.map(c => new Cotacao(c))];
    // });
    // this.fornecedorService.listar(`grupoProduto=${this.grupoCotacao.grupoProduto.descricao}`).subscribe((fornecedores: Fornecedor[]) => {
    this.fornecedorService.listar(`grupoProduto=eletronicos`).subscribe((fornecedores: Fornecedor[]) => {
      console.log(fornecedores);
      
      this.listaFornecedores = [...fornecedores.map(f => new Fornecedor(f))];
    })
  }

  filtrar(filtro: string) {
    this.query = filtro;
    this.carregarProdutos();
  }

  onTransformarValor() {
    this.inputing = false;
    let v = this.valor.toString();
    v = v.replace(',', '.');
    this.valor = parseFloat(v);
    this.valor = this.currencyPipe.transform(this.valor, 'BRL', 'R$', '1.2-2', 'pt');
  }

  setValor() {
    this.inputing = true;
    if (this.valor) {
      let v = this.valor.toString();
      v = v.replace('R$', '');
      v = v.replace(' ', '');
      v = v.replace('.', '');
      this.valor = v;
    }
  }

  onSalvar(event: any) {
    if (event.type == "submit") {
      this.grupoCotacaoForm.markAllAsTouched();

    if (!this.grupoCotacaoForm.valid) {
      event.preventDefault();
      event.stopPropagation();
      this.toastrService.error("Todos os campos obrigatórios devem ser preenchidos");
    } else {
      this.cotacaoService.alterar(this.grupoCotacao).subscribe(() => {
        this.toastrService.success("Cotação atualizada!");
      });
      console.log(this.grupoCotacao);
        
      this.router.navigate(['/cotacao']);
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
        this.router.navigate(['/cotacao']);
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
      mailTo: [...this.listaFornecedores.map(f => f.email), 'comprador@email.com'],
      text: "Prezado fornecedor,\n\nSolicito a cotação dos produtos listados para o referido prazo, contidos no link abaixo.\n\nAtte.,\nComprador."
    });
  }

  verificarTamanhoTela(): boolean {
    return window.innerWidth >= 992;
  }
}