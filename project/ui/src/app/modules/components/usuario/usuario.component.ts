import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';
import { Setor } from '@models/setor.model';
import { Funcao } from '@models/funcao.model';
import { CentroCusto } from '@models/centro-custo.model';
import { Permissao } from '@models/permissao.model';
import { Usuario } from '@models/usuario.model';
import { UsuarioService } from '@services/usuario.service';
import { CentroCustoService } from '@services/centro-custo.service';
import { SetorService } from '@services/setor.service';
import { FuncaoService } from '@services/funcao.service';
import { PermissaoService } from '@services/permissao.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioForm: FormGroup;
  listaSetor: Setor[] = [];
  listaPermissao: Permissao[] = [];
  listaCentroCusto: CentroCusto[] = [];
  listaFuncao: Funcao[] = [];
  titulo: string = 'Novo usuário';

  private maxLength: number = 255;

  // Angular validators
  private textValidator = [
    Validators.required,
    Validators.maxLength(this.maxLength),
    Validators.minLength(1),
    Validators.nullValidator,
  ];
  private commonValidators = [Validators.required, Validators.nullValidator];
  private modalRef: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private centroCustoService: CentroCustoService,
    private setorService: SetorService,
    private funcaoService: FuncaoService,
    private permissaoService: PermissaoService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      dados: this.formBuilder.group({
        nome: [this.usuario?.nome ?? '', [...this.textValidator]],
        email: [this.usuario?.email ?? '', [...this.textValidator, Validators.email]],
        senha: ['', [...this.textValidator]],
        confirmarSenha: ['', [...this.textValidator]]
      }),
      grupoSetor: this.formBuilder.group({
        setor: [this.usuario?.setor.id ?? '', [...this.commonValidators]],
        centroCusto: [this.usuario?.setor?.centrosCusto ?? '', [...this.commonValidators]],
      }),
      grupoFuncao: this.formBuilder.group({
        funcao: [this.usuario?.funcao.id ?? '', [...this.commonValidators]],
        permissao: [this.usuario?.funcao?.permissoes ?? '', [...this.commonValidators]],
      }),
    });

    this.setorService.listar().subscribe(s => this.listaSetor = [...s]);
    this.centroCustoService.listar().subscribe(cc => this.listaCentroCusto = [...cc]);
    this.funcaoService.listar().subscribe(f => this.listaFuncao = [...f]);
    this.permissaoService.listar().subscribe(p => this.listaPermissao = [...p]);
  }

  onSalvar(event: any) {
    this.usuarioForm.markAllAsTouched();

    if(this.usuarioForm.valid) {
      this.usuario.nome = this.usuarioForm.get('nome').value;
      this.usuario.email = this.usuarioForm.get('email').value;
      this.usuario.hashSenha = this.usuarioService.hashString(this.usuarioForm.get('senha').value);
      this.usuario.setor = new Setor(this.usuarioForm.get('setor').value);
      this.usuario.funcao = new Funcao(this.usuarioForm.get('funcao').value);

      if (this.usuario.id) {
        this.usuarioService.alterar(this.usuario).subscribe(() => {
          this.toastrService.success("Usuário atualizado com sucesso!");
        });
      } else {
        this.usuarioService.alterar(this.usuario).subscribe(() => {
          this.toastrService.success("Usuário cadastrado com sucesso!");
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
        this.router.navigate(['/administracao/usuario']);
      }
    });
  }

  onRestaurar(event: any) {
    // if (event.key == "Enter") {
    //   return
    // }
    event.preventDefault();
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
