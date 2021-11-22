import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { StatusEnum } from '@models/enum';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Atributo, Filtro, TipoFiltro } from './filter.model';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent implements OnInit {

  @Input() atributos: Atributo[] = [];
  @Input() filtrosAdicionados: Filtro[] = [];

  tiposParametro: any[] = [];
  hoje: NgbDateStruct = this.converterDateParaNgbDateStruct(new Date());
  
  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    if (!this.filtrosAdicionados.length) {
      this.filtrosAdicionados.push(new Filtro({
        atributo: this.atributos[0]
      }));
    }
    this.tiposParametro = [
      {
        tipo: TipoFiltro.STRING,
        parametros: [
          { nome: "Contém", parametro: "LikeIgnoreCase" },
          { nome: "Igual a", parametro: "EqualIgnoreCase" },
          { nome: "Diferente de", parametro: "NotEqualIgnoreCase" }
        ]
      },
      {
        tipo: TipoFiltro.NUMBER,
        parametros: [
          { nome: "Igual a", parametro: "Equal" },
          { nome: "Diferente de", parametro: "NotEqual" },
          { nome: "Maior que", parametro: "GreaterThan" },
          { nome: "Maior ou igual a", parametro: "GreaterThanOrEqual" },
          { nome: "Menor que", parametro: "LessThan" },
          { nome: "Menor ou igual a", parametro: "LessThanOrEqual" }
        ]
      },
      {
        tipo: TipoFiltro.DATE,
        parametros: [
          { nome: "Começa em", parametro: "Inicio" },
          { nome: "Termina em", parametro: "Fim" },
          { nome: "Igual a", parametro: "Equal" }
        ]
      },
      {
        tipo: TipoFiltro.STATUS,
        parametros: [
          { nome: "Igual a", parametro: "EqualIgnoreCase" },
          { nome: "Diferente de", parametro: "NotEqual" }
        ]
      }
    ];
  }

  getParametros(filtro: Filtro) {
    return this.tiposParametro.map(p => {
      if (p.tipo == filtro.atributo.tipo)
       return p.parametros
    }).filter(p => p != undefined)[0];
  }

  onAlterarFiltroAtributo(atributo: Atributo, filtro: Filtro) {
    filtro.atributo = atributo;
    filtro.parametros = this.getParametros(filtro);
    filtro.statusOptions = this.getStatus();
  }

  onDateSelect(date: any, filtro: Filtro) {
    // filtro.valor = this.converterNgbDateStructParaDate(date).toLocaleDateString('en-US');
  }

  onAdicionarFiltro() {
    this.filtrosAdicionados.push(new Filtro({
      atributo: this.atributos[0]
    }));
  }

  onRemoverFiltro(index: number) {
    this.filtrosAdicionados.splice(index, 1);
  }

  onFiltrar() {
    let params = [];
    console.log(this.filtrosAdicionados);
    
    this.filtrosAdicionados.forEach(f => {
      params.push(`${f.atributo.atributo}${f.parametro}=${f.valor ?? ''}`);
    });
    this.onDismiss(params.join('&'));
  }

  getStatus() {
    let statusKeys = Object.keys(StatusEnum);
    return statusKeys.slice(statusKeys.length / 2);
  }

  onDismiss(filtro?: string) {
    this.activeModal.close(filtro);
  }

  getData(filtro: Filtro) {
    console.log(filtro);
    
    if (filtro.valor) {
      return this.converterDateParaNgbDateStruct(new Date(filtro.valor));
    }
    return '';
  }

  private converterNgbDateStructParaDate(ngbDate: NgbDateStruct): Date {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  private converterDateParaNgbDateStruct(date: Date): NgbDateStruct {
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

}
