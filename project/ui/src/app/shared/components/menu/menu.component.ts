import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '@models/usuario.model';
import { UsuarioService } from '@services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class MenuComponent implements OnInit, OnDestroy {
  sideBarSize: string = "0";
  menuItemList: { name: string, value: any, icon: string, canAccess: boolean }[] = [];
  menuItemDropdownList: { name: string, icon: string, canAccess: boolean, itens: { name: string, value: any, canAccess: boolean }[] }[] = [];
  adminMenu: { name: string, icon: string, canAccess: boolean, itens: { name: string, value: any, canAccess: boolean }[] } = null;
  hasUsuarioLogado: boolean = false;
  usuario: Usuario = new Usuario();

  subscription: Subscription;

  constructor(
    private _eref: ElementRef, 
    private usuarioService: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.hasUsuarioLogado = this.usuarioService.getUsuarioLogado() != null;
    if (this.hasUsuarioLogado) {
      this.usuario = new Usuario(this.usuarioService.getUsuarioLogado());
      this.loadMenu();
    }
    this.subscription = this.usuarioService.reloadMenu.subscribe(() =>
      this.ngOnInit()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
        icon: "bi-journal-text",
        canAccess: this.usuarioService.verificarPermissao("Ler requisição")
      },
      {
        name: "Cotação",
        value: "/grupo-cotacao",
        icon: "bi-cash-coin",
        canAccess: this.usuarioService.verificarPermissao("Ler cotação")
      },
      {
        name: "Ordem de compra",
        value: '/ordem-compra',
        icon: "bi-cart2",
        canAccess: this.usuarioService.verificarPermissao("Ler ordem")
      },
      {
        name: "Fornecedores",
        value: "/fornecedor",
        icon: "bi-box",
        canAccess: this.usuarioService.verificarPermissao("Ler fornecedor")
      }
    ]

    this.menuItemDropdownList = [
      {
        name: "Aprovações",
        icon: "bi-journal-check",
        canAccess: false,
        itens: [
          {
            name: "Aprovar requisição",
            value: "requisicao/aprovacao",
            canAccess: this.usuarioService.verificarPermissao("Aprovar requisição")
          },
          {
            name: "Aprovar ordem",
            value: "ordem-compra/aprovacao",
            canAccess: this.usuarioService.verificarPermissao("Aprovar ordem")
          }
        ]
      }
    ];

    this.menuItemDropdownList.forEach(midl => {
      if (midl.itens.find(i => i.canAccess)) {
        midl.canAccess = true;
      }
    });

    this.adminMenu =
      {
        name: "Administração",
        icon: " bi-gear-fill",
        canAccess: this.usuarioService.verificarPermissao("Administrador"),
        itens: [
          {
            name: "Gerenciar produtos",
            value: "administracao/produto",
            canAccess: true
          },
          {
            name: "Gerenciar usuários",
            value: "administracao/usuario",
            canAccess: true
          }
        ]
      }
  }

  onLogout() {
    this.usuarioService.logout();
  }

  onEditarPerfil() {
    this.router.navigate(['/administracao/usuario/editar-perfil']);
  }
}
