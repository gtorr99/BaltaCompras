import { Component, OnInit } from '@angular/core';
import { CotacaoService } from '@services/cotacao.service';
import { ProdutoService } from '@services/produto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { 
  Usuario
} from '@models/index';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
  providers: [
    CurrencyPipe
  ]
})
export class EditarPerfilComponent implements OnInit {

  titulo: string;
  usuario: Usuario = new Usuario();
  usuarioForm: FormGroup;
  private modalRef: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}

  private textValidator = [
    Validators.required,
    Validators.maxLength(255),
    Validators.minLength(1),
    Validators.nullValidator,
  ];
  private commonValidators = [Validators.required, Validators.nullValidator];

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
        nome: [this.usuario?.nome ?? '', [...this.textValidator]],
        email: [this.usuario?.email ?? '', [...this.textValidator, Validators.email]],
        senha: ['', [...this.textValidator]],
        confirmarSenha: ['', [...this.textValidator]]
      });
  }

  carregarProdutos() {
    // this.produtoService.listar(this.query).subscribe((produtos: Produto[]) => {
    //   this.listaProdutos = [...produtos.map(p => new Produto(p))];
    // });
    // this.cotacaoService.listarCotacoesDoGrupo(this.grupoCotacao.id).subscribe((cotacoes: Cotacao[]) => {
    //   this.listaCotacoes = [...cotacoes.map(c => new Cotacao(c))];
    // });
    // this.fornecedorService.listar(`grupoProduto=${this.grupoCotacao.grupoProduto.descricao}`).subscribe((fornecedores: Fornecedor[]) => {
  }

  onSalvar(event: any) {
    if (event.type == "submit") {
      this.usuarioForm.markAllAsTouched();

    if (!this.usuarioForm.valid) {
      event.preventDefault();
      event.stopPropagation();
      this.toastrService.error("Todos os campos obrigatórios devem ser preenchidos");
    } else {
      // this.cotacaoService.alterar(this.grupoCotacao).subscribe(() => {
      //   this.toastrService.success("Cotação atualizada!");
      // });
      // console.log(this.grupoCotacao);
        
      // this.router.navigate(['/cotacao']);
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
        // this.router.navigate(['/cotacao']);
      }
    });
  }

  onRestaurar(event: any) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Restaurar formulário";
    this.modalRef.componentInstance.message = "Todas as alterações serão perdidas. Você tem certeza que deseja restaurar?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.usuarioForm.reset();
      }
    });
  }
}