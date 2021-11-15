import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateRangePickerComponent {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  toDateRange: string = '';
  fromDateRange: string = '';
  dateRange: string = '';

  @Output() selectedDate: EventEmitter<any> = new EventEmitter();

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private datepipe: DatePipe) {
    this.fromDate = calendar.getToday();
    this.toDate = null;
  }

  onDateSelection(date: NgbDate) {
    let from: any;
    let to: any;

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if (this.fromDate) {
      this.fromDateRange = this.datepipe.transform(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day).toISOString(), 'dd/MM/yyyy');
    } else {
      this.fromDateRange = '';
    }

    if (this.toDate) {
      this.toDateRange = this.datepipe.transform(new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day).toISOString(), 'dd/MM/yyyy');
    } else {
      this.toDateRange = '';
    }

    this.dateRange = this.fromDateRange + ' - ' + this.toDateRange;

    if (this.fromDateRange && this.toDateRange) {
      let dateParam = [];
      dateParam.push(`dataInicio=${this.datepipe.transform(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day).toISOString(), 'yyyy-MM-dd')}`);
      dateParam.push(`dataFim=${this.datepipe.transform(new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day).toISOString(), 'yyyy-MM-dd')}`);
      this.selectedDate.emit(dateParam.join('&'));
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}