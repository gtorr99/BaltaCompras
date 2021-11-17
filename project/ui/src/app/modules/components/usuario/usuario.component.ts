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
        setor: [this.usuario?.setor ?? '', [...this.commonValidators]],
        centroCusto: [this.usuario?.setor?.centroCusto ?? '', [...this.commonValidators]],
      }),
      grupoFuncao: this.formBuilder.group({
        funcao: [this.usuario?.funcao ?? '', [...this.commonValidators]],
        permissao: [this.usuario?.funcao?.permissoes ?? '', [...this.commonValidators]],
      }),
    });

    // this.grupoProdutoService.listar().subscribe(gpl => {
    //   this.grupoProdutoList = [...gpl];
    //   this.fornecedorForm.get('gruposProduto').patchValue(this.fornecedor.gruposProduto?.map(gp => gp.descricao));
    // });

    this.setorService.listar().subscribe(s => this.listaSetor = [...s]);
    this.centroCustoService.listar().subscribe(cc => this.listaCentroCusto = [...cc]);
    this.funcaoService.listar().subscribe(f => this.listaFuncao = [...f]);
    this.permissaoService.listar().subscribe(p => this.listaPermissao = [...p]);
  }

  onSalvar(event: any) {
    if (event.key == "Enter" || event.type == "submit") {
      // this.fornecedorForm.markAllAsTouched();
      // var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
      // form.classList.add('was-validated');

      // if (form.checkValidity() === false || !this.fornecedorForm.valid) {
      //   event.preventDefault();
      //   event.stopPropagation();
      // } else {
      //   this.fornecedor.id = this.fornecedor.id ?? 0;
      //   this.fornecedor.nomeFantasia = this.fornecedorForm.get('info.nomeFantasia').value,
      //   this.fornecedor.razaoSocial = this.fornecedorForm.get('info.razaoSocial').value,
      //   this.fornecedor.inscricaoEstadual = this.fornecedorForm.get('info.inscricaoEstadual').value,
      //   this.fornecedor.cnpj = this.fornecedorForm.get('info.cnpj').value,
      //   this.fornecedor.email = this.fornecedorForm.get('contato.email').value,
      //   this.fornecedor.telefone = this.fornecedorForm.get('contato.telefone').value,
      //   this.fornecedor.cep = this.fornecedorForm.get('endereco.cep').value,
      //   this.fornecedor.rua = this.fornecedorForm.get('endereco.rua').value,
      //   this.fornecedor.numero = this.fornecedorForm.get('endereco.numero').value,
      //   this.fornecedor.complemento = this.fornecedorForm.get('endereco.complemento').value,
      //   this.fornecedor.bairro = this.fornecedorForm.get('endereco.bairro').value,
      //   this.fornecedor.cidade = this.fornecedorForm.get('endereco.cidade').value,
      //   this.fornecedor.estado = this.fornecedorForm.get('endereco.estado').value
      //   this.fornecedor.gruposProduto = this.fornecedorForm.get('gruposProduto').value.map(gp => {
      //     return new GrupoProduto({ id: gp, descricao: this.grupoProdutoList.find(gpl => gpl.id == gp).descricao });
      //   })

      //   if (this.fornecedor.id) {
      //     this.fornecedorService.alterar(this.fornecedor).subscribe();
      //   } else {
      //     this.fornecedorService.salvar(this.fornecedor).subscribe();
      //   }
      //   this.router.navigate(['/fornecedor']);
      // }
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
