import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from '@models/email.model';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  @Input() email: Email = new Email();
  @Output() enviar: EventEmitter<Email> = new EventEmitter();

  emailForm: FormGroup;
  private modalRef: NgbModalRef
  
  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      mailTo: [{value: this.email.mailTo ?? '', disabled: true}],
      copy: [this.email.copy ?? ''],
      subject: [this.email.subject ?? ''],
      text: [this.email.text ?? '']
    })
  }

  onEnviarEmail(event: any) {
    console.log(event.type);
    
    if (event.type == "submit" || event.type == "click") {
      this.onDismiss(true);
    }
  }

  onCancelar() {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Cancelar email";
    this.modalRef.componentInstance.message = "Todas as alterações serão perdidas. Você tem certeza que deseja cancelar?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.onDismiss();
      }
    });
  }

  onDismiss(enviarEmail: boolean = false) {
    if (enviarEmail) {
      this.activeModal.close(this.email);
    }
    this.activeModal.close();
  }

}
