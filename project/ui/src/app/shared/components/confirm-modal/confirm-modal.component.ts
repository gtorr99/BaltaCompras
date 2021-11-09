import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string = "Confirmar ação";
  @Input() message: string = "Você tem certeza que deseja confirmar a ação?";

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onDismiss(value: boolean = false) {
    this.activeModal.close(value);
  }
}
