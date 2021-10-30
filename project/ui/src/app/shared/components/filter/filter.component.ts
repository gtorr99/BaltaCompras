import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  
  @Input() searchTextOptions: SearchMap[];
  @Input() filters: Filter[];

  @Output() optionEvent: EventEmitter<any> = new EventEmitter();

  selectedOption: SearchMap = { label: "Filtro", value: "" };


  constructor() { }

  ngOnInit(): void {
    if (this.searchTextOptions)
      this.selectedOption = this.searchTextOptions[0];
  }

  updateDropdownLabel(option: SearchMap) {
    this.selectedOption = option;
    this.optionEvent.emit(option);
  }

  onChangeDefaultFilter(filter: any, option: SearchMap) {}

}

export class SearchMap {
  label: string;
  value: string;
}

export class Filter {
  label: string;
  type: FilterType;
  iconClass?: string;
  options ?: SearchMap[];
  selectedOption?: string
}

export enum FilterType {
  DATE = 1,
  DROPDOWN
}