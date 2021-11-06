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
@Table(name = "grupo_cotacao_produto")
public class GrupoCotacaoProduto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, name = "quantidade_total")
    private float quantidadeTotal;
    @ManyToOne
    @JoinColumn(name = "id_grupo_cotacao", referencedColumnName = "id")
    private GrupoCotacao grupoCotacao;

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

    
}
