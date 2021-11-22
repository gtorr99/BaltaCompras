import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FilterSelectComponent } from './filter-select/filter-select.component';
import { Atributo, Filtro } from './filter-select/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  
  @Input() atributos: Atributo[] = [];
  @Input() filtroAvancado: boolean = false;
  @Output() search: EventEmitter<any> = new EventEmitter();

  filtrosAdicionados: Filtro[] = [];
  textoPesquisa: string = '';
  filtrosAvancadosQuery: string = '';
  private modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    
  }

  onFiltrar() {
    let params = [];
    params.push(`filtro=${this.textoPesquisa}`);
    params.push(this.filtrosAvancadosQuery);
    console.log(params.join('&'));
    
    this.search.emit(params.join('&'));
  }

  onAdicionarFiltros() {
    this.modalRef = this.modalService.open(FilterSelectComponent, { size: 'lg' });
    this.modalRef.componentInstance.filtrosAdicionados = this.filtrosAdicionados;
    this.modalRef.componentInstance.atributos = this.atributos;
    this.modalRef.closed.subscribe(filtro => {
      this.filtrosAvancadosQuery = filtro;
      this.filtrosAdicionados = this.modalRef.componentInstance.filtrosAdicionados;
      this.onFiltrar();
    });
  }
}