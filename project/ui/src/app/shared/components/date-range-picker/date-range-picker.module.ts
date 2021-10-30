import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateRangePickerComponent } from './date-range-picker.component';

const modules = [
    FormsModule,
    ReactiveFormsModule
]

@NgModule({
    declarations: [DateRangePickerComponent],
    imports: [...modules],
    exports: [...modules, DateRangePickerComponent]
})
export class DateRangePickerModule { }