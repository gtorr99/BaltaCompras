import { Component, Injectable, OnInit } from '@angular/core';
import { RequisicaoService } from '@services/requisicao.service';
import { CentroCustoService } from '@services/centro-custo.service';
import { ProdutoService } from '@services/produto.service';
import { NgbDateParserFormatter, NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { 
  CentroCusto,
  Produto,
  RequisicaoProduto,
  Requisicao,
  Usuario, 
  ProdutoSelecionado
} from '@models/index';
import { DatePipe } from '@angular/common';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}
@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class RequisicaoComponent implements OnInit {

  requisicao: Requisicao = new Requisicao();
  requisicaoForm: FormGroup;
  listaCentrosCusto: CentroCusto[] = [];
  listaProdutos: ProdutoSelecionado[] = [];
  listaProdutosAdicionados: ProdutoSelecionado[] = [];

  /* Filtro */
  query: string = '';

  /* NgbDatePicker */
  hoje: NgbDateStruct = this.converterDateParaNgbDateStruct(new Date());
  prazo: NgbDateStruct;

  private modalRef: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private requisicaoService: RequisicaoService,
    private centroCustoService: CentroCustoService,
    private produtoService: ProdutoService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requisicao = this.requisicaoService.requisicaoSelecionada;
    if (this.requisicao.prazo) {
      let prazo = this.requisicao?.prazo;
      this.requisicao.prazo = new Date(Date.parse(prazo.toString()));
    }
      
    this.requisicaoForm = this.formBuilder.group({
      prazo: [this.requisicao?.prazo ? this.converterDateParaNgbDateStruct(this.requisicao?.prazo) : null, Validators.required],
      centroCusto: [this.requisicao.centroCusto ?? null, Validators.required],
      observacoes: [this.requisicao.observacoes ?? '', Validators.maxLength(65.000)],
      radioListaProdutos: ['filtrados']
    });

    // if (this.requisicao.produtos) {
    //   this.listaProdutosAdicionados = [...this.requisicao.produtos.map(p =>
    //     new ProdutoSelecionado(p)
    //   )];
    // }

    this.centroCustoService.listar().subscribe((centrosCusto: CentroCusto[]) => {
      this.listaCentrosCusto = [...centrosCusto.map(cc => new CentroCusto(cc))];
    });

    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listar(this.query).subscribe((produtos: Produto[]) => {
      this.listaProdutos = [...produtos.map(p => { return new ProdutoSelecionado(
        new RequisicaoProduto ({
          produto: new Produto(p),
          quantidade: 0
        })
      )})];
      console.log(this.listaProdutos);
      
      this.removerProdutosJaAdicionados();
    });
  }

  removerProdutosJaAdicionados() {
    let produtos = [...this.listaProdutos];
    produtos.forEach(p => {
      if (this.listaProdutosAdicionados.find(pAdd => pAdd.requisicaoProduto.produto.id == p.requisicaoProduto.produto.id)) {
        this.listaProdutos.splice(this.listaProdutos.findIndex(p2 => p2.requisicaoProduto.produto.id == p.requisicaoProduto.produto.id), 1);
      }
    })
  }

  filtrar(filtro: string) {
    this.query = filtro;
    this.carregarProdutos();
  }

  onAdicionarProduto(produtoSelecionado?: ProdutoSelecionado) {
    let funcaoAdicionarProduto = (p: ProdutoSelecionado) => {
      if (p.isChecked && this.onValidarQuantidade(p)) {
        this.listaProdutosAdicionados.push(p);
        this.listaProdutos.splice(this.listaProdutos.findIndex(item => item.requisicaoProduto.produto.id == p.requisicaoProduto.produto.id), 1);
      }
    };

    if (produtoSelecionado) {
      produtoSelecionado.isChecked = true;
      funcaoAdicionarProduto(produtoSelecionado);
    } else {
      let listaProdutosTemp = [...this.listaProdutos];
      listaProdutosTemp.forEach(produto => {
        funcaoAdicionarProduto(produto);
      });
    }
  }

  onRemoverProduto(produtoSelecionado?: ProdutoSelecionado) {
    let funcaoRemoverProduto = (p: ProdutoSelecionado) => {
      if (!p.isChecked) {
        p.requisicaoProduto.quantidade = 0;
        this.listaProdutosAdicionados.splice(this.listaProdutosAdicionados.findIndex(item => item.requisicaoProduto.produto.id == p.requisicaoProduto.produto.id), 1);
        this.listaProdutos.unshift(p);
        this.carregarProdutos();
      }
    }

    if (produtoSelecionado) {
      produtoSelecionado.isChecked = false;
      funcaoRemoverProduto(produtoSelecionado);
    } else {
      let produtosAdicionadosTemp = [...this.listaProdutosAdicionados];
      produtosAdicionadosTemp.forEach((p: ProdutoSelecionado) => {
        funcaoRemoverProduto(p);
      });
    }
  }

  onValidarQuantidade(produtoSelecionado: ProdutoSelecionado): boolean {
    if (produtoSelecionado.requisicaoProduto.quantidade < 1) {
      produtoSelecionado.requisicaoProduto.quantidade = 0;
      produtoSelecionado.inputVermelhoSeQuantidadeZero = true;
      this.toastrService.warning("Por favor, insira a quantidade");
      return false;
    }
    return true;
  }

  onSalvar(event: any) {
    if (event.type == "submit") {
      this.requisicaoForm.markAllAsTouched();

      if (!this.requisicaoForm.valid) {
        event.preventDefault();
        event.stopPropagation();
        this.toastrService.error("Todos os campos obrigatórios devem ser preenchidos");
      } else {
        if (!this.listaProdutosAdicionados.length) {
          event.preventDefault();
          event.stopPropagation();
          this.toastrService.warning("Ao menos um produto deve ser adicionado");
        } else {
          if (this.requisicao.id) {
            this.requisicaoService.alterar(this.requisicao).subscribe(() => {
              this.toastrService.success("Requisição atualizada!");
            })
          } else {
            this.listaProdutosAdicionados.forEach(p => { p.requisicaoProduto.converterQuantidadeParaUnMedidaPadrao(p.medidaSelecionada); console.log("Medida: " + p.medidaSelecionada);
            });
            
            this.requisicao.id = this.requisicao.id ?? 0;
            this.requisicao.centroCusto = this.requisicaoForm.get('centroCusto').value;
            this.requisicao.data = new Date();
            this.requisicao.prazo = this.converterNgbDateStructParaDate(this.requisicaoForm.get('prazo').value),
            this.requisicao.observacoes = this.requisicaoForm.get('observacoes').value ?? '';
            this.requisicao.usuario = this.requisicao.usuario ?? new Usuario({ id: 1 });
            this.requisicao.produtos = [...this.listaProdutosAdicionados.map(p => p.requisicaoProduto)];

            if (this.requisicao.id) {
              this.requisicaoService.alterar(this.requisicao).subscribe(() => {
                this.toastrService.success("Requisição atualizada!");
              });
            } else {
              this.requisicaoService.salvar(this.requisicao).subscribe(() => {
                this.toastrService.success("Nova requisição salva com sucesso!");
              });
            }
            console.log(this.requisicao);
            
            this.router.navigate(['/requisicao']);
          }
        }
      }
    }
  }

  onCancelar(event: any) {
    event.preventDefault();
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Cancelar edição";
    this.modalRef.componentInstance.message = "Todas as alterações serão perdidas. Você tem certeza que deseja cancelar?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.router.navigate(['/requisicao']);
      }
    });
  }

  onRestaurar(event: any) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { size: 'md' });
    this.modalRef.componentInstance.title = "Restaurar formulário";
    this.modalRef.componentInstance.message = "Todas as alterações serão perdidas. Você tem certeza que deseja restaurar?";
    this.modalRef.closed.subscribe(response => {
      if (response) {
        this.requisicaoForm.reset();
        this.requisicaoForm.get('radioListaProdutos').setValue('filtrados');
      }
    });
  }

  onAumentarQuantidade(reqProd: RequisicaoProduto) {
    reqProd.quantidade += 1;
  }

  onDiminuirQuantidade(reqProd: RequisicaoProduto) {
    if (reqProd.quantidade > 0) {
      reqProd.quantidade -= 1;
    }
  }

  verificarTamanhoListaMedidas(reqProd: RequisicaoProduto): boolean {
    return reqProd.produto.getListaMedidas().length > 1;
  }

  verificarTamanhoTela(): boolean {
    return window.innerWidth >= 992;
  }

  verificarHaProdutosSelecionados(produtos: ProdutoSelecionado[], checked: boolean) {
    return produtos.find(p => p.isChecked == checked);
  }

  onDateSelect(date: any | NgbDateStruct) {
    this.requisicaoForm.get('prazo').patchValue(date);
  }

  private converterNgbDateStructParaDate(ngbDate: NgbDateStruct): Date {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  private converterDateParaNgbDateStruct(date: Date): NgbDateStruct {
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }
}