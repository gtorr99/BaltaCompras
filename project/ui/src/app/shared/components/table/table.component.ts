import { Component, Input, OnInit } from '@angular/core';
import { TableStructure } from './table-structure.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableStructure: TableStructure;
  @Input() pagingTable: boolean;
  
  pageSizes = [10, 20, 30];
  selectedPageSize = this.pageSizes[0];
  dateStart: Date = new Date("10/10/2021");
  dateEnd: Date = new Date("10/31/2021");

  constructor() { }

  ngOnInit(): void {
  }

  emitEvent(item: any) {

  }
}
