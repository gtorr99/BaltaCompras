import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() btnClass: string = 'btn-primary';
  @Input() isDisabled: boolean = false;
  @Input() type: string = 'button';

  @Output() action: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.action.emit();
  }

}
