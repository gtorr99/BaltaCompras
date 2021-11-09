import { Component, OnInit } from '@angular/core';
import { GrupoProduto } from '@models/grupo-produto.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Fornecedor } from '@models/fornecedor.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { ToastrService } from 'ngx-toastr';
import { FornecedorService } from 'app/modules/services/fornecedor.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CEP } from '@models/cep.model';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  fornecedorForm: FormGroup;
  estados: { label: string, value: string }[] = [];
  grupoProdutoList: GrupoProduto[] = [];

  // Form masks
  cnpjMask: string = "00.000.000/0000-99";
  inscricaoEstadualMask: string = "000.000.000.000";
  phoneMask: string = "(00) 00000-0000";
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
    private toastrService: ToastrService,
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
    this.fornecedorForm = this.formBuilder.group({
      info: this.formBuilder.group({
        nomeFantasia: ['', this.textValidator],
        razaoSocial: ['', this.textValidator],
        inscricaoEstadual: ['', this.commonValidators],
        cnpj: ['', this.commonValidators],
      }),
      contato: this.formBuilder.group({
        email: ['', [...this.commonValidators, Validators.email]],
        telefone: ['', this.commonValidators],
      }),
      endereco: this.formBuilder.group({
        cep: ['', [...this.commonValidators, Validators.pattern(this.cepPattern)]],
        rua: ['', this.textValidator],
        numero: ['', [...this.commonValidators, Validators.maxLength(5)]],
        complemento: ['', Validators.maxLength(this.maxLength)],
        bairro: ['', this.textValidator],
        cidade: ['', this.textValidator],
        estado: [null, this.commonValidators],
      }),
      gruposProduto: ['', this.commonValidators]
    });
    this.loadEstados();
    this.loadGrupos();

  }

  onSearch() {
    if (this.cepPattern.test(this.fornecedorForm.get('endereco.cep').value)) {
      this.fornecedorService.verificarCEP(this.fornecedorForm.get('endereco.cep').value)
        .subscribe(response => {
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
            // this.fornecedorForm.setErrors({
            //   endereco: {
            //     cep: 
            //   }
            // })
          }
      });
    }
  }


  onSubmit(event: any) {
    if (event.key == "Enter" || event.type == "submit") {
      this.fornecedorForm.markAllAsTouched();
      var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
      if (form.checkValidity() === false && !this.fornecedorForm.valid) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        let fornecedor = new Fornecedor({
          id: 0,
          nomeFantasia: this.fornecedorForm.get('info.nomeFantasia').value,
          razaoSocial: this.fornecedorForm.get('info.razaoSocial').value,
          inscricaoEstadual: this.fornecedorForm.get('info.inscricaoEstadual').value,
          cnpj: this.fornecedorForm.get('info.cnpj').value,
          email: this.fornecedorForm.get('contato.email').value,
          telefone: this.fornecedorForm.get('contato.telefone').value,
          cep: this.fornecedorForm.get('endereco.cep').value,
          rua: this.fornecedorForm.get('endereco.rua').value,
          numero: this.fornecedorForm.get('endereco.numero').value,
          complemento: this.fornecedorForm.get('endereco.complemento').value,
          bairro: this.fornecedorForm.get('endereco.bairro').value,
          cidade: this.fornecedorForm.get('endereco.cidade').value,
          estado: this.fornecedorForm.get('endereco.estado').value,
          gruposProduto: this.fornecedorForm.get('gruposProduto').value.map(gp => {
            return new GrupoProduto({ id: gp, descricao: this.grupoProdutoList.find(gpl => gpl.id == gp).descricao });
          })
        });
        this.fornecedorService.salvar(fornecedor).subscribe(() => {
          this.toastrService.success("Fornecedor cadastrado!");
        });
      }
      form.classList.add('was-validated');
    }
  }

  onReset(event: any) {
    event.preventDefault();
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Resetar formulário";
    this.modalRef.componentInstance.message = "As informações inseridas no formulário serão excluídas. Você tem certeza que deseja cancelar?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        form.classList.remove('was-validated');
        this.fornecedorForm.reset();
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

  // TODO - hit endpoints
  private loadGrupos() {
    this.grupoProdutoList = [
      new GrupoProduto({ id: 1, descricao: "Material limpeza" }),
      new GrupoProduto({ id: 2, descricao: "Eletrônicos" }),
      new GrupoProduto({ id: 3, descricao: "Alimentos" })
    ]
  }
}
