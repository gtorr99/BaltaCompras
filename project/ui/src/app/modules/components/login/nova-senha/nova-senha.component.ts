import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '@models/usuario.model';
import { UsuarioService } from '@services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.scss']
})
export class NovaSenhaComponent implements OnInit {

  usuario: Usuario = new Usuario();
  loginForm: FormGroup;
  senhasIguais: boolean = true;
  showPassword: boolean = false;
  passwordIconClass: string = "bi bi-eye";
  private routeSub: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    let id = null;
    this.routeSub = this.route.params.subscribe(params => {
      id = params['id'];
      if (id == null) {
        this.router.navigate(['**']);
      } else {
        this.usuarioService.listar(`id=${id}`).subscribe(usuario => {
          if (usuario) {
            this.usuario = new Usuario(usuario[0]);
          } else {
            this.router.navigate(['**']);
          }
        })
      }
    });

    this.loginForm = this.formBuilder.group({
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    });
  }

  onSalvar() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.usuario.hashSenha = this.usuarioService.hashString(this.loginForm.get('senha').value);
      this.usuarioService.alterar(this.usuario).subscribe(() => {
        this.toastrService.success("Senha atualizada com sucesso!")
        this.router.navigate(["/login"]);
      });
    }
  }

  validarSenha(): boolean {
    this.senhasIguais = this.loginForm.get('senha').value == this.loginForm.get('confirmarSenha').value;
    return this.senhasIguais;
  }

  displayPassword() {
    this.showPassword = !this.showPassword;
    this.passwordIconClass = this.showPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
  }

}
