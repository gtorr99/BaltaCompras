import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SearchMap } from '@shared/components';
import { UnMedidaEnum } from 'app/enum/un-medida.enum';
import { DropdownModel } from 'app/models/dropdown.model';
import { Produto } from 'app/models/produto.model';
import { RequisicaoProduto } from 'app/models/requisicao-produto.model';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.scss']
})
export class RequisicaoComponent implements OnInit {

  currentUser: string = "Admin";
  today: Date = new Date();

  textOptions: SearchMap[] = [];
  listaProdutos: Produto[] = [];
  listaProdutosFiltrados: { reqProd: RequisicaoProduto, isChecked: boolean, medidaSelecionada: string }[] = [];
  listaProdutosAdicionados: { reqProd: RequisicaoProduto, isChecked: boolean, medidaSelecionada: string }[] = [];

  ngOnInit(): void {
    this.textOptions = [
      {
        label: "Grupo produtos",
        value: ""
      },
      {
        label: "Eletrônicos",
        value: "eletronicos"
      },
      {
        label: "Material de limpeza",
        value: "limpeza"
      }
    ];

    this.listaProdutos = [
      {
        id: 1,
        descricao: "ps5",
        unMedida: UnMedidaEnum.unidade,
        grupoProduto: {
          id: 1,
          descricao: "Eletrônicos"
        }
      },
      {
        id: 2,
        descricao: "ssd intel 1tb",
        unMedida: UnMedidaEnum.unidade,
        grupoProduto: {
          id: 1,
          descricao: "Eletrônicos"
        }
      },
      {
        id: 3,
        descricao: "Água sanitária",
        unMedida: UnMedidaEnum.L,
        grupoProduto: {
          id: 2,
          descricao: "Material de limpeza"
        }
      },
      {
        id: 4,
        descricao: "Sabão em pó",
        unMedida: UnMedidaEnum.g,
        grupoProduto: {
          id: 2,
          descricao: "Material de limpeza"
        }
      },
      {
        id: 4,
        descricao: "Sabão em pó",
        unMedida: UnMedidaEnum.g,
        grupoProduto: {
          id: 2,
          descricao: "Material de limpeza"
        }
      },
      {
        id: 4,
        descricao: "Sabão em pó",
        unMedida: UnMedidaEnum.g,
        grupoProduto: {
          id: 2,
          descricao: "Material de limpeza"
        }
      },
      {
        id: 4,
        descricao: "Sabão em pó",
        unMedida: UnMedidaEnum.g,
        grupoProduto: {
          id: 2,
          descricao: "Material de limpeza"
        }
      },
      {
        id: 4,
        descricao: "Sabão em pó",
        unMedida: UnMedidaEnum.g,
        grupoProduto: {
          id: 2,
          descricao: "Material de limpeza"
        }
      },
      {
        id: 4,
        descricao: "Sabão em pó",
        unMedida: UnMedidaEnum.g,
        grupoProduto: {
          id: 2,
          descricao: "Material de limpeza"
        }
      },
    ];

    this.preencherListaProdutosFiltrados(this.listaProdutos);
  }

  grupo: string = "Todos";
  onSearch(filtro: SearchMap) {
    if(filtro.value != '') {
      this.grupo = filtro.label;
      this.preencherListaProdutosFiltrados(this.listaProdutos.filter(p => p.grupoProduto.descricao == this.grupo));
    }
    else {
      this.grupo = "Todos";
      this.preencherListaProdutosFiltrados(this.listaProdutos);
    }
  }

  onAdd() {
    this.listaProdutosFiltrados.forEach(rp => {
      if (rp.isChecked) {
        this.listaProdutosAdicionados.push(rp);
        this.listaProdutosFiltrados.splice(this.listaProdutosFiltrados.indexOf(rp), 1);
      }
    });
  }

  onRemove() {
    this.listaProdutosAdicionados.forEach(rp => {
      if (!rp.isChecked) {
        this.listaProdutosAdicionados.splice(this.listaProdutosAdicionados.indexOf(rp), 1);
        this.listaProdutosFiltrados.push(rp);
      }
    });
  }

  onIncreaseQuantity(lista: {reqProd: RequisicaoProduto, isChecked: boolean}[], reqProd: RequisicaoProduto) {
    lista.find(rp => { if (rp.reqProd == reqProd) rp.reqProd.quantidade += 1 });
  }

  onDecreaseQuantity(lista: {reqProd: RequisicaoProduto, isChecked: boolean}[], reqProd: RequisicaoProduto) {
    lista.find(rp => { if (rp.reqProd == reqProd) rp.reqProd.quantidade -= 1 })
  }

  preencherListaProdutosFiltrados(produtos: Produto[]) {
    this.listaProdutosFiltrados = [];
    produtos.forEach(p => {
      let prod = new Produto(p);
      this.listaProdutosFiltrados.push({
        reqProd: new RequisicaoProduto({
          id: 0,
          produto: prod,
          quantidade: 0
        }),
        isChecked: false,
        medidaSelecionada: prod.getListaMedidas()[0]
      });
    });
  }

  @ViewChild('btnMedida') btnMedida: ElementRef;
  checkListSize(reqProd: RequisicaoProduto): boolean {
    if (reqProd.produto.getListaMedidas().length > 1) {
      return true;
    }
    // this.btnMedida.nativeElement.removeAttribute()
    return false;
  }
  // keyword = 'name';
  // data = [
  //   {
  //     id: 1,
  //     name: 'Usa'
  //   },
  //   {
  //     id: 2,
  //     name: 'England'
  //   }
  // ];


  // selectEvent(item) {
  // }

  // onChangeSearch(val: string) {
  // }

  // onFocused(e) {
  // }
}