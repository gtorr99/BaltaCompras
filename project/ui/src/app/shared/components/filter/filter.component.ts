import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  
  @Input() searchTextOptions: SearchMap[] = [];
  @Input() filters: Filter[] = [];

  @Output() optionEvent: EventEmitter<any> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();

  selectedOption: SearchMap = { label: "Filtro", value: "" };
  searchText: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.searchTextOptions)
      this.selectedOption = this.searchTextOptions[0];
  }

  updateDropdownLabel(option: SearchMap) {
    this.selectedOption = option;
    this.emitSearchEvent();
  }

  alterarFiltro(filter: any, option: SearchMap) {
    filter.selectedOption = option.label;
    this.emitSearchEvent();
  }

  emitSearchEvent(event?: any) {
    let params = [];
    this.filters.forEach(f => params.push(`${f.paramName}=${f.selectedOption}`));
    params.push(`${this.selectedOption.value}=${event?.target?.value?.toLowerCase() ?? this.searchText.toLowerCase()}`);
    this.search.emit(params.join('&'));
  }
}

export class SearchMap {
  label: string;
  value: string;
}

export class Filter {
  label: string;
  type: FilterType;
  paramName: string;
  iconClass?: string;
  options ?: SearchMap[];
  selectedOption?: string
}

export enum FilterType {
  DATE = 1,
  DROPDOWN
}