import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class MenuComponent implements OnInit {
  sideBarSize: string = "0";
  menuItemList: { name: string, value: any, icon: string }[] = [];
  menuItemDropdownList: { name: string, icon: string, itens: { name: string, value: any }[] }[] = [];

  constructor(private _eref: ElementRef) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target))
      this.onCloseSideBar();
  }

  onOpenSideBar() {
    this.sideBarSize = "230px";
  }
  
  onCloseSideBar() {
    this.sideBarSize = "0";
  }

  open(value: any) {}
  
  private loadMenu() {
    this.menuItemList = [
      {
        name: "Requisição",
        value: "/requisicao",
        icon: "bi-journal-text"
      },
      {
        name: "Cotação",
        value: "/cotacao",
        icon: "bi-cash-coin"
      },
      {
        name: "Ordem de compra",
        value: null,
        icon: "bi-cart2"
      },
      {
        name: "Fornecedores",
        value: "/fornecedor",
        icon: "bi-box"
      }
    ]

    this.menuItemDropdownList = [
      {
        name: "Aprovações",
        icon: "bi-journal-check",
        itens: [
          {
            name: "Aprovar requisição",
            value: "'/requisicao/aprovacao'"
          },
          {
            name: "Aprovar ordem",
            value: null
          }
        ]
      }
    ];
  }
}
