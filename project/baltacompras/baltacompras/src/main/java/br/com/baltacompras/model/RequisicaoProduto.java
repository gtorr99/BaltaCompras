package br.com.baltacompras.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "requisicao_produto")
public class RequisicaoProduto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "id_requisicao", referencedColumnName = "id")
    private Requisicao requisicao;
    @ManyToOne
    @JoinColumn(name = "id_produto", referencedColumnName = "id")
    private Produto produtos;
    @Column(nullable = false)
    private float quantidade;
    @ManyToOne
    @JoinColumn(name = "id_grupo_cotacao_produto", referencedColumnName = "id")
    private GrupoCotacaoProduto grupoCotacaoProduto;
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Requisicao getRequisicao() {
        return requisicao;
    }
    public void setProdutos(Produto produtos) {
        this.produtos = produtos;
    }
    public void setRequisicao(Requisicao requisicao) {
        this.requisicao = requisicao;
    }
    public Produto getProdutos() {
        return produtos;
    }
    public float getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(float quantidade) {
        this.quantidade = quantidade;
    }
    public GrupoCotacaoProduto getGrupoCotacaoProduto() {
        return grupoCotacaoProduto;
    }
    public void setGrupoCotacaoProduto(GrupoCotacaoProduto grupoCotacaoProduto) {
        this.grupoCotacaoProduto = grupoCotacaoProduto;
    }

    
}
