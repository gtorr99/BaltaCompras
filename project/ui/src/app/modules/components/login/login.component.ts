import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '@models/usuario.model';
import { UsuarioService } from '@services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loginForm: FormGroup
  showPassword: boolean = false;
  passwordIconClass: string = "bi bi-eye";
  usuario: Usuario = new Usuario();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.usuarioService.getUsuarioLogado()) {
      this.usuario = new Usuario(this.usuarioService.getUsuarioLogado());
      this.validarPermissoes();
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.required]]
      //, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
    });
  }

  onLogin(event: any) {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.usuarioService.validarUsuario(
        this.loginForm.get('email').value,
        this.loginForm.get('senha').value
      ).subscribe(usuario => { this.usuario = new Usuario(usuario); this.validarPermissoes() });
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  displayPassword() {
    this.showPassword = !this.showPassword;
    this.passwordIconClass = this.showPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
  }

  private validarPermissoes() {
    if (this.usuario.funcao.permissoes.find(permissao => permissao.descricao == "Ler cotação")) {
      this.informarAcesso(true);
      this.router.navigate(['/grupo-cotacao']);
    } else if (this.usuario.funcao.permissoes.find(permissao => permissao.descricao == "Aprovar ordem")) {
      this.informarAcesso(true);
      this.router.navigate(['/ordem-compra/aprovacao']);
    } else if (this.usuario.funcao.permissoes.find(permissao => permissao.descricao == "Aprovar requisição")) {
      this.informarAcesso(true);
      this.router.navigate(['/requisicao/aprovacao']);
    } else if (this.usuario.funcao.permissoes.find(permissao => permissao.descricao == "Ler ordem")) {
      this.informarAcesso(true);
      this.router.navigate(['/ordem-compra']);
    } else if (this.usuario.funcao.permissoes.find(permissao => permissao.descricao == "Ler requisição" || permissao.descricao == "Administrador")) {
      this.informarAcesso(true);
      this.router.navigate(['/requisicao']);
    } else {
      this.informarAcesso(false);
    }
  }

  private informarAcesso(liberado: boolean) {
    if (liberado) {
      if (!this.usuarioService.getUsuarioLogado()) {
        this.toastrService.success("Acesso liberado");
        this.usuarioService.updateUsuarioLogado(this.usuario);
        this.usuarioService.onReloadMenu();
      }
    } else { 
      this.toastrService.error("Usuário não possui permissões mínimas de leitura no sistema.\nPor favor, contate o administrador.");
    }
  }
}
