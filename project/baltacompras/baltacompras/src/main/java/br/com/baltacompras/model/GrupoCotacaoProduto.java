package br.com.baltacompras.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "grupo_cotacao_produto")
public class GrupoCotacaoProduto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, name = "quantidade_total")
    private float quantidadeTotal;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_grupo_cotacao", referencedColumnName = "id")
    private GrupoCotacao grupoCotacao;

    @OneToMany(mappedBy = "grupoCotacaoProduto")
    Set<RequisicaoProduto> requisicaoProduto;

    public GrupoCotacaoProduto() {}

    public GrupoCotacaoProduto(float quantidadeTotal, GrupoCotacao grupoCotacao) {
        this.id = 0;
        this.quantidadeTotal = quantidadeTotal;
        this.grupoCotacao = grupoCotacao;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public float getQuantidadeTotal() {
        return quantidadeTotal;
    }
    public void setQuantidadeTotal(float quantidadeTotal) {
        this.quantidadeTotal = quantidadeTotal;
    }
    public GrupoCotacao getGrupoCotacao() {
        return grupoCotacao;
    }
    public void setGrupoCotacao(GrupoCotacao grupoCotacao) {
        this.grupoCotacao = grupoCotacao;
    }

    public Set<RequisicaoProduto> getRequisicaoProduto() {
        return requisicaoProduto;
    }

    public void setRequisicaoProduto(Set<RequisicaoProduto> requisicaoProduto) {
        this.requisicaoProduto = requisicaoProduto;
    }
}
