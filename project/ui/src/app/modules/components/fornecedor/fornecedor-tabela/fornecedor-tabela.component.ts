import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '@models/fornecedor.model';
import { Filter, FilterType, SearchMap } from '@shared/components';
import { TableStructure } from '@shared/components/table/table-structure.model';

@Component({
  selector: 'app-fornecedor-tabela',
  templateUrl: './fornecedor-tabela.component.html',
  styleUrls: ['./fornecedor-tabela.component.scss']
})
export class FornecedorTabelaComponent implements OnInit {

  tabelaRequisicao: TableStructure
  textOptions: SearchMap[] = [];
  filterOptions: Filter[] = [];

  constructor() { }

  ngOnInit(): void {
    this.textOptions = [
      {
        label: "CNPJ",
        value: "cnpj"
      },
      {
        label: "Nome",
        value: "nomeFantasia"
      }
    ];

    this.filterOptions = [
      {
        label: "Data registo",
        type: FilterType.DATE
      },
      {
        label: "Status",
        type: FilterType.DROPDOWN,
        options: [
          { label: "Status", value: "" },
          { label: "Ativo", value: "ATIVO" },
          { label: "Inativo", value: "INATIVO" }
        ]
      },
      {
        label: "Grupo produto",
        type: FilterType.DROPDOWN,
        options: [
          { label: "Grupo produto", value: "" },
          { label: "Eletrônicos", value: "eletronicos" },
          { label: "Material de limpeza", value: "materialLimpeza" }
        ]
      },
    ]
    this.tabelaRequisicao =
    {
      headers: [
        {
          label: "Fornecedor",
          isSortable: true
        },
        {
          label: "Registrado em",
          isSortable: true
        },
        {
          label: "CNPJ",
          isSortable: true
        },
        {
          label: "Email",
          isSortable: true
        },
        {
          label: "Telefone",
          isSortable: true
        },
        {
          label: "Status",
          isSortable: true
        },
        {
          label: "Grupo produto",
          isSortable: true
        }
      ],

      rows: [
        {
          items: [
            { value: "Sony" },
            { value: new Date().toLocaleString() },
            { value: "00.000.000/0000-00" },
            { value: "sony_ps5@gmail.com" },
            { value: "(00) 00000-0000" },
            { value: "Ativo", isStatus: true },
            { value: "Eletrônicos" },
          ]
        },
        {
          items: [
            { value: "Amazon" },
            { value: new Date().toLocaleString() },
            { value: "11.111.111/1111-11" },
            { value: "amazon5@gmail.com" },
            { value: "(00) 00000-0000" },
            { value: "Ativo", isStatus: true },
            { value: "Eletrônicos, Material de limpeza" }
          ]
        },
        {
          items: [
            { value: "Extra" },
            { value: new Date().toLocaleString() },
            { value: "22.222.222/2222-22" },
            { value: "extra@gmail.com" },
            { value: "" },
            { value: "Ativo", isStatus: true },
            { value: "Eletrônicos, Material de limpeza" }
          ]
        },
        {
          items: [
            { value: "Rede limpa" },
            { value: new Date().toLocaleString() },
            { value: "33.333.333/3333-33" },
            { value: "" },
            { value: "(00) 00000-0000" },
            { value: "Ativo", isStatus: true },
            { value: "Material de limpeza" }
          ]
        }
      ],
      contextMenu: [
        {
          label: "Detalhes",
          value: "detalhes"
        },
        {
          label: "Editar",
          value: "editar"
        },
        {
          label: "Cancelar",
          value: "cancelar"
        }
      ]
    };
  }

}
