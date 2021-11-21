import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { 
  Usuario
} from '@models/index';
import { DatePipe } from '@angular/common';
import { UsuarioService } from '@services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  titulo: string;
  usuario: Usuario = new Usuario();
  usuarioForm: FormGroup;
  senhasIguais: boolean = true;
  showPassword: boolean = false;
  passwordIconClass: string = "bi bi-eye";
  private modalRef: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  private textValidator = [
    Validators.maxLength(255)
  ];

  ngOnInit(): void {
    this.usuario = new Usuario(this.usuarioService.getUsuarioLogado());
    this.usuarioForm = this.formBuilder.group({
      nome: [this.usuario?.nome ?? '', [...this.textValidator]],
      email: [this.usuario?.email ?? '', [...this.textValidator, Validators.email]],
      senha: ['', [...this.textValidator]],
      confirmarSenha: ['', [...this.textValidator]]
    });
  }

  onSalvar() {
      this.usuarioForm.markAllAsTouched();
    if (this.usuarioForm.valid) {
      if (this.validarSenha()) {
        this.usuario.nome = this.usuarioForm.get('nome').value;
        this.usuario.email = this.usuarioForm.get('email').value;
        this.usuario.hashSenha = this.usuarioService.hashString(this.usuarioForm.get('senha').value);

        this.usuarioService.alterar(this.usuario).subscribe(() => {
          this.toastrService.success("Usuário atualizado!");
        });
        this.router.navigate(['/login']);
      } else {
        this.toastrService.error("Senha e confirmar senha devem ser iguais!");
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
        this.router.navigate(['/login']);
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

  validarSenha(): boolean {
    this.senhasIguais = this.usuarioForm.get('senha').value == this.usuarioForm.get('confirmarSenha').value;
    return this.senhasIguais;
  }

  displayPassword() {
    this.showPassword = !this.showPassword;
    this.passwordIconClass = this.showPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
  }
}