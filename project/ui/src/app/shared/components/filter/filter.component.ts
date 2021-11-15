import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  
  @Input() exibirBarraPesquisa: boolean = false;
  @Input() searchTextOptions: SearchMap[] = [];
  @Input() filters: Filter[] = [];
  @Input() inputPlaceholder: string[] = [];
  placeholder: string = "Pesquisar...";

  @Output() optionEvent: EventEmitter<any> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();

  selectedOption: SearchMap = { label: "Filtro", value: "" };
  searchText: string = '';
  dateRange: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.searchTextOptions) {
      this.selectedOption = this.searchTextOptions[0];
      this.exibirBarraPesquisa = true;
    }
    if (this.inputPlaceholder) {
      this.placeholder = "Pesquisar por " + this.inputPlaceholder.join(' ou ');
    }
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
    console.log(event);
    
    let params = [];
    this.filters.forEach(f => params.push(`${f.paramName}=${f.selectedOption == f.label ? '' : f.selectedOption ?? ''}`));

    if (this.selectedOption) {
      params.push(`${this.selectedOption.value}=${event?.target?.value?.toLowerCase() ?? this.searchText.toLowerCase()}`);
    } else {
      this.inputPlaceholder.forEach(i => {
        params.push(`${i}=${event?.target?.value?.toLowerCase() ?? this.searchText.toLowerCase()}`);
      });
    }

    params.push(this.dateRange);
    this.search.emit(params.join('&'));
    console.log(params);
    
  }

  onSelectDate(selectedDateRange: any) {
    console.log(selectedDateRange);
    
    this.dateRange = selectedDateRange;
    this.emitSearchEvent();
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