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
  private modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    
  }

  onFiltrar(filtro?: string) {
    let params = [];
    this.atributos.forEach(a => params.push(`${a.atributo}=${this.textoPesquisa}`));
    if (filtro) {
      params.push(filtro);
    }
    this.search.emit(params.join('&'));
  }

  onAdicionarFiltros() {
    this.modalRef = this.modalService.open(FilterSelectComponent, { size: 'lg' });
    this.modalRef.componentInstance.filtrosAdicionados = this.filtrosAdicionados;
    this.modalRef.componentInstance.atributos = this.atributos;
    this.modalRef.closed.subscribe(filtro => {
      this.filtrosAdicionados = this.modalRef.componentInstance.filtrosAdicionados;
      this.onFiltrar(filtro);
    });
  }
}