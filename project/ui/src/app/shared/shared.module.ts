import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as fromComponents from './components';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './components/title/title.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [...fromComponents.components, TitleComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  exports: [...fromComponents.components, RouterModule, NgbModule]
})
export class SharedModule { }
