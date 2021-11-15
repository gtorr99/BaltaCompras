import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as fromComponents from './components';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './components/title/title.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [...fromComponents.components, TitleComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgSelectModule
  ],
  exports: [...fromComponents.components, RouterModule, NgbModule, NgSelectModule]
})
export class SharedModule { }
