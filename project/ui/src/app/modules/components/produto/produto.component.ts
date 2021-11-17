import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrupoProduto } from '@models/grupo-produto.model';
import { Produto } from '@models/produto.model';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GrupoProdutoService } from '@services/grupo-produto.service';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  @Input() produto: Produto = new Produto();
  @Output() salvar: EventEmitter<Produto> = new EventEmitter();

  titulo: string = "Novo produto"
  produtoForm: FormGroup;
  listaGrupoProduto: GrupoProduto[] = [];
  private modalRef: NgbModalRef
  
  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private grupoProdutoService: GrupoProdutoService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    if (this.produto.id) {
      this.titulo = "Editar produto"
    }
    this.produtoForm = this.formBuilder.group({
      descricao: [this.produto.descricao ?? '', [Validators.required, Validators.maxLength(255)]],
      grupoProduto: [null, [Validators.required, Validators.maxLength(255)]]
    });
    this.grupoProdutoService.listar().subscribe(gp => {
      this.listaGrupoProduto = [...gp.map(g => new GrupoProduto(g))];
      this.produtoForm.get('grupoProduto').patchValue(this.produto.grupoProduto.id);
    });
  }

  onSalvar(event: any) {
    if (event.type == "submit" || event.type == "click") {
      this.produtoForm.markAllAsTouched();
      if (this.produtoForm.valid) {
        this.onDismiss(true);
      }
    }
  }

  onCancelar() {
    // this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    // this.modalRef.componentInstance.title = "Cancelar novo produto";
    // this.modalRef.componentInstance.message = "Todas as alterações serão perdidas. Você tem certeza que deseja cancelar?";
    // this.modalRef.closed.subscribe(response => {
    //   if (response) {
        this.onDismiss();
    //   }
    // });
  }

  onDismiss(enviarEmail: boolean = false) {
    if (enviarEmail) {
      this.activeModal.close(this.produto);
    }
    this.activeModal.close();
  }

}
