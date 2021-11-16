import { Component, OnInit } from '@angular/core';
import { CotacaoService } from '@services/cotacao.service';
import { ProdutoService } from '@services/produto.service';
import { NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  // listaProdutos: Produto[] = [];
  listaProdutos: number[] = [1, 2, 3, 4, 5];
  prazo = new Date();
  hoje: NgbDateStruct = this.converterDateParaNgbDateStruct(new Date());

  /* Filtro */
  query: string = '';

  valor: any;
  inputing: boolean = false;
  aliqIpi: any;
  email: Email;

  private modalRef: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private cotacaoService: CotacaoService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cotacaoExternaForm = this.formBuilder.group({
      prazoFornecedor: ['', Validators.required],
      observacoes: ['', Validators.maxLength(65.000)]
    });
    this.carregarProdutos();
  }

  carregarProdutos() {
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
      this.cotacaoExternaForm.markAllAsTouched();

      if (!this.cotacaoExternaForm.valid) {
        event.preventDefault();
        event.stopPropagation();
        this.toastrService.error("Todos os campos obrigatórios devem ser preenchidos");
      } else {
        this.cotacaoService.alterar(null).subscribe(() => {
          this.toastrService.success("Cotação enviada com successo!");
        });
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
        this.cotacaoExternaForm.reset();
      }
    });
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