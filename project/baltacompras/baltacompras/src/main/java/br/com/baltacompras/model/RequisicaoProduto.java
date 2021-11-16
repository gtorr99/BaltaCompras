package br.com.baltacompras.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "requisicao_produto")
public class RequisicaoProduto {

    @EmbeddedId
    RequisicaoProdutoId id;

    @JsonIgnore
    @ManyToOne
    @MapsId("idRequisicao")
    @JoinColumn(name = "id_requisicao")
    private Requisicao requisicao;

    @ManyToOne
    @MapsId("idProduto")
    @JoinColumn(name = "id_produto")
    private Produto produto;

    @Column(nullable = false)
    private float quantidade;

    @ManyToOne
    @JoinColumn(name = "id_grupo_cotacao_produto", referencedColumnName = "id")
    private GrupoCotacaoProduto grupoCotacaoProduto;
    
    public RequisicaoProdutoId getId() {
        return id;
    }
    public Requisicao getRequisicao() {
        return requisicao;
    }
    public Produto getProduto() {
        return produto;
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
