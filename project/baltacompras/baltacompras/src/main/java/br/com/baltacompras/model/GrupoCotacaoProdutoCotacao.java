package br.com.baltacompras.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "grupo_cotacao_produto_cotacao")
public class GrupoCotacaoProdutoCotacao {

    @EmbeddedId
    GrupoCotacaoProdutoCotacaoId id;

    @JsonIgnore
    @ManyToOne
    @MapsId("idCotacao")
    @JoinColumn(name = "id_cotacao")
    private Cotacao cotacao;

    @ManyToOne
    @MapsId("idGrupoCotacaoProduto")
    @JoinColumn(name = "id_grupo_cotacao_produto")
    private GrupoCotacaoProduto grupoCotacaoProduto;

    @Column(nullable = false)
    private float aliquotaIpi;
    private float precoUnitario;
    private Boolean disponivel;

    public GrupoCotacaoProdutoCotacaoId getId() {
        return id;
    }

    public void setId(GrupoCotacaoProdutoCotacaoId id) {
        this.id = id;
    }

    public Cotacao getCotacao() {
        return cotacao;
    }

    public void setCotacao(Cotacao cotacao) {
        this.cotacao = cotacao;
    }

    public GrupoCotacaoProduto getGrupoCotacaoProduto() {
        return grupoCotacaoProduto;
    }

    public void setGrupoCotacaoProduto(GrupoCotacaoProduto grupoCotacaoProduto) {
        this.grupoCotacaoProduto = grupoCotacaoProduto;
    }

    public float getAliquotaIpi() {
        return aliquotaIpi;
    }

    public void setAliquotaIpi(float aliquotaIpi) {
        this.aliquotaIpi = aliquotaIpi;
    }

    public float getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(float precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public Boolean getDisponivel() {
        return disponivel;
    }

    public void setDisponivel(Boolean disponivel) {
        this.disponivel = disponivel;
    }
}
