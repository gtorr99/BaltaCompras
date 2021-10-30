import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import * as fromComponents from './components';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { FilterComponent } from './components/filter/filter.component';
import { DateRangePickerModule } from './components/date-range-picker/date-range-picker.module';
@NgModule({
  declarations: [...fromComponents.components, ButtonComponent, TableComponent, FilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DateRangePickerModule
  ],
  exports: [
    ...fromComponents.components, 
    DateRangePickerModule]
})
export class SharedModule { }
