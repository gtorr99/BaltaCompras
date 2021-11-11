import { Component, OnInit } from '@angular/core';
import { Filter, FilterType, SearchMap } from '@shared/components';

@Component({
  selector: 'app-requisicao-tabela',
  templateUrl: './requisicao-tabela.component.html',
  styleUrls: ['./requisicao-tabela.component.scss']
})
export class RequisicaoTabelaComponent implements OnInit {
  textOptions: SearchMap[] = [];
  filterOptions: Filter[] = [];

  constructor() { }

  ngOnInit(): void {
    this.textOptions = [
      {
        label: "Nº Requisição",
        value: "requisicaoId"
      },
      {
        label: "Requisitante",
        value: "usuario"
      },
      {
        label: "Setor",
        value: "setor"
      },
      {
        label: "Centro de Custo",
        value: "centroCusto"
      }
    ];

    // let statusKeys = Object.keys(StatusEnum);
    // this.filters = [
    //   {
    //     label: "Status",
    //     paramName: "status",
    //     type: FilterType.DROPDOWN,
    //     options: [...statusKeys.slice(statusKeys.length / 2).map(k => {
    //       return { label: k, value: StatusEnum[k] }
    //     })
    //     ]
    //   }
    // ]

    this.filterOptions = [
      // {
      //   label: "Data",
      //   type: FilterType.DATE
      // },
      // {
      //   label: "Status",
      //   type: FilterType.DROPDOWN,
      //   options: [
      //     { label: "Aberto", value: "ABERTO" },
      //     { label: "Em processamento", value: "EM_PROCESSAMENTO" },
      //     { label: "Cancelado", value: "CANCELADO" }
      //   ]
      // }
    ]
    // this.tabelaRequisicao =
    // {
    //   headers: [
    //     {
    //       label: "Nº Requisição",
    //       isSortable: true
    //     },
    //     {
    //       label: "Data",
    //       isSortable: true
    //     },
    //     {
    //       label: "Requisitante",
    //       isSortable: true
    //     },
    //     {
    //       label: "Setor",
    //       isSortable: true
    //     },
    //     {
    //       label: "Centro de Custo",
    //       isSortable: true
    //     },
    //     {
    //       label: "Status",
    //       isSortable: true
    //     }
    //   ],

    //   rows: [
    //     {
    //       items: [
    //         { value: "REQ0001" },
    //         { value: new Date().toLocaleString() },
    //         { value: "Vitor Valoroso" },
    //         { value: "Produção" },
    //         { value: "1901" },
    //         { value: "Aberto", isStatus: true }
    //       ]
    //     },
    //     {
    //       items: [
    //         { value: "REQ0002" },
    //         { value: new Date().toLocaleString() },
    //         { value: "Vitor Valoroso" },
    //         { value: "Produção" },
    //         { value: "1901" },
    //         { value: "Aberto", isStatus: true }
    //       ]
    //     },
    //     {
    //       items: [
    //         { value: "REQ0003" },
    //         { value: new Date().toLocaleString() },
    //         { value: "Vitor Valoroso" },
    //         { value: "Produção" },
    //         { value: "1901" },
    //         { value: "Aberto", isStatus: true }
    //       ]
    //     },
    //     {
    //       items: [
    //         { value: "REQ0004" },
    //         { value: new Date().toLocaleString() },
    //         { value: "Vitor Valoroso" },
    //         { value: "Produção" },
    //         { value: "1901" },
    //         { value: "Aberto", isStatus: true }
    //       ]
    //     }
    //   ],
    //   contextMenu: [
    //     {
    //       label: "Detalhes",
    //       value: "detalhes"
    //     },
    //     {
    //       label: "Editar",
    //       value: "editar"
    //     },
    //     {
    //       label: "Cancelar",
    //       value: "cancelar"
    //     }
    //   ]
    // };
  }
}
