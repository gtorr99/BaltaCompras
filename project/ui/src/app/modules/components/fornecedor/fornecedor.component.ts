import { Component, OnInit } from '@angular/core';
import { GrupoProduto } from '@models/grupo-produto.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Fornecedor } from '@models/fornecedor.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { FornecedorService } from 'app/modules/services/fornecedor.service';
import { CEP } from '@models/cep.model';
import { Router } from '@angular/router';
import { GrupoProdutoService } from '@services/grupo-produto.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  fornecedor: Fornecedor = new Fornecedor();
  fornecedorForm: FormGroup;
  estados: { label: string, value: string }[] = [];
  grupoProdutoList: GrupoProduto[] = [];

  // Form masks
  cnpjMask: string = "00.000.000/0000-99";
  inscricaoEstadualMask: string = "000.000.000.000";
  phoneMask: string = "(00) 00000-0000";
  numeroMask: string = "99999";
  cepMask: string = "00000-000";
  cepPattern: RegExp = new RegExp(/^\d{5}\d{3}/);

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
    private fornecedorService: FornecedorService,
    private grupoProdutoService: GrupoProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fornecedor = this.fornecedorService.fornecedorSelecionado;
    this.fornecedorForm = this.formBuilder.group({
      info: this.formBuilder.group({
        nomeFantasia: [this.fornecedor.nomeFantasia, this.textValidator],
        razaoSocial: [this.fornecedor.razaoSocial, this.textValidator],
        inscricaoEstadual: [this.fornecedor.inscricaoEstadual, this.commonValidators],
        cnpj: [this.fornecedor.cnpj, this.commonValidators],
      }),
      contato: this.formBuilder.group({
        email: [this.fornecedor.email, [...this.commonValidators, Validators.email]],
        telefone: [this.fornecedor.telefone, this.commonValidators],
      }),
      endereco: this.formBuilder.group({
        cep: [this.fornecedor.cep, [...this.commonValidators, Validators.pattern(this.cepPattern)]],
        rua: [this.fornecedor.rua, this.textValidator],
        numero: [this.fornecedor.numero, [...this.commonValidators]],
        complemento: [this.fornecedor.complemento, Validators.maxLength(this.maxLength)],
        bairro: [this.fornecedor.bairro, this.textValidator],
        cidade: [this.fornecedor.cidade, this.textValidator],
        estado: [this.fornecedor.estado?.toUpperCase() ?? null, this.commonValidators],
      }),
      gruposProduto: ['', this.commonValidators]
    });

    // this.grupoProdutoList = this.grupoProdutoService.listar();
    this.grupoProdutoService.listar().subscribe(gpl => {
      this.grupoProdutoList = [...gpl];
      this.fornecedorForm.get('gruposProduto').patchValue(this.fornecedor.gruposProduto?.map(gp => gp.descricao));
    });
   
    this.loadEstados();
  }

  onChangeCEP() {
    let cep = document.getElementById('cep') as HTMLFormElement;
    this.fornecedorService.verificarCEP(this.fornecedorForm.get('endereco.cep').value)
      .subscribe((response: CEP) => {
        if (!response.erro) {
          this.fornecedorForm.patchValue({
            endereco: {
              rua: response.logradouro,
              complemento: response.complemento,
              bairro: response.bairro,
              cidade: response.localidade,
              estado: response.uf
            }
          });
          this.setValid(cep);
        } else {
          this.fornecedorForm.patchValue({
            endereco: {
              rua: '',
              complemento: '',
              bairro: '',
              cidade: '',
              estado: ''
            }
          });
          this.fornecedorForm.get('endereco.cep').setErrors({ 'incorrect': true });
          this.setInvalid(cep);
        }
    });
  }

  onChangeCnpj() {
    let cnpj = document.getElementById('cnpj') as HTMLFormElement;
    if (this.fornecedorForm.get('info.cnpj').value) {
      this.fornecedorService.validarCnpj(this.fornecedorForm.get('info.cnpj').value)
        .subscribe((response: boolean) => {
          if (response) {
            this.setValid(cnpj);
          } else {
            this.fornecedorForm.get('info.cnpj').setErrors({ 'incorrect': true });
            this.setInvalid(cnpj);
          }
        });
    } else {
      this.setInvalid(cnpj);
    }
  }

  setInvalid(form: HTMLFormElement) {
    form.classList.remove('is-valid');
    form.classList.add(...['was-validated', 'is-invalid']);
  }

  setValid(form: HTMLFormElement) {
    form.classList.remove('is-invalid');
    form.classList.add(...['was-validated', 'is-valid']);
  }

  onSalvar(event: any) {
    if (event.key == "Enter" || event.type == "submit") {
      this.fornecedorForm.markAllAsTouched();
      var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
      form.classList.add('was-validated');

      if (form.checkValidity() === false || !this.fornecedorForm.valid) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        this.fornecedor.id = this.fornecedor.id ?? 0;
        this.fornecedor.nomeFantasia = this.fornecedorForm.get('info.nomeFantasia').value,
        this.fornecedor.razaoSocial = this.fornecedorForm.get('info.razaoSocial').value,
        this.fornecedor.inscricaoEstadual = this.fornecedorForm.get('info.inscricaoEstadual').value,
        this.fornecedor.cnpj = this.fornecedorForm.get('info.cnpj').value,
        this.fornecedor.email = this.fornecedorForm.get('contato.email').value,
        this.fornecedor.telefone = this.fornecedorForm.get('contato.telefone').value,
        this.fornecedor.cep = this.fornecedorForm.get('endereco.cep').value,
        this.fornecedor.rua = this.fornecedorForm.get('endereco.rua').value,
        this.fornecedor.numero = this.fornecedorForm.get('endereco.numero').value,
        this.fornecedor.complemento = this.fornecedorForm.get('endereco.complemento').value,
        this.fornecedor.bairro = this.fornecedorForm.get('endereco.bairro').value,
        this.fornecedor.cidade = this.fornecedorForm.get('endereco.cidade').value,
        this.fornecedor.estado = this.fornecedorForm.get('endereco.estado').value
        this.fornecedor.gruposProduto = this.fornecedorForm.get('gruposProduto').value.map(gp => {
          return new GrupoProduto({ id: gp, descricao: this.grupoProdutoList.find(gpl => gpl.id == gp).descricao });
        })

        if (this.fornecedor.id) {
          this.fornecedorService.alterar(this.fornecedor).subscribe();
        } else {
          this.fornecedorService.salvar(this.fornecedor).subscribe();
        }
        this.router.navigate(['/fornecedor']);
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
        this.router.navigate(['/fornecedor']);
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
        this.fornecedorForm.reset();

        var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        form.classList.remove(...['was-validated', 'is-valid', 'is-invalid']);

        let forms = document.getElementsByClassName('was-validated') as HTMLCollectionOf<HTMLFormElement>;
        if (forms.length) {
          for (let i = 0; i <= forms.length; i++) {
            forms[i]?.classList.remove(...['was-validated', 'is-valid', 'is-invalid']);
          }
        }
      }
    });
  }

  getEstadoBindLabel(): string {
    return window.innerWidth < 1024 ? "value" : "label";
  }

  private loadEstados() {
    this.estados = [
      { label: "Acre", value: "AC" },
      { label: "Alagoas", value: "AL" },
      { label: "Amapá", value: "AP" },
      { label: "Amazonas", value: "AM" },
      { label: "Bahia", value: "BA" },
      { label: "Ceará", value: "CE" },
      { label: "Espírito Santo", value: "ES" },
      { label: "Goiás", value: "GO" },
      { label: "Maranhão", value: "MA" },
      { label: "Mato Grosso", value: "MT" },
      { label: "Mato Grosso do Sul", value: "MS" },
      { label: "Minas Gerais", value: "MG" },
      { label: "Pará", value: "PA" },
      { label: "Paraíba", value: "PB" },
      { label: "Paraná", value: "PR" },
      { label: "Pernambuco", value: "PE" },
      { label: "Piauí", value: "PI" },
      { label: "Rio de Janeiro", value: "RJ" },
      { label: "Rio Grande do Norte", value: "RN" },
      { label: "Rio Grande do Sul", value: "RS" },
      { label: "Rondônia", value: "RO" },
      { label: "Roraima", value: "RR" },
      { label: "Santa Catarina", value: "SC" },
      { label: "São Paulo", value: "SP" },
      { label: "Sergipe", value: "SE" },
      { label: "Tocantins", value: "TO" },
      { label: "Distrito Federal", value: "DF" }
    ]
  }
}
