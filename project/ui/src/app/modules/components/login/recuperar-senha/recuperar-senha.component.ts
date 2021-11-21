import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '@models/usuario.model';
import { UsuarioService } from '@services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {

  loginForm: FormGroup;
  showMsgEmailEnviado: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  onEnviarEmail() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.usuarioService.listar(`email=${this.loginForm.get('email').value}`).subscribe(usuario => {
        if (usuario) {
          let url = `http://localhost:4200/login/cadastrar-nova-senha/${usuario[0].id}`;

          this.usuarioService.enviarEmail(url, "gabriel.guimaraes6@fatec.sp.gov.br", "Link para recuperação de senha ", "BaltaCompras - Recuperação de Senha").subscribe();
          this.toastrService.success("Email enviado!");
          this.showMsgEmailEnviado = true;

        } else {
          this.toastrService.error("Email não cadastrado!");
        }
      })
    }
  }
}
