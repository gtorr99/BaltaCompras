package br.com.baltacompras.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class GrupoCotacaoProdutoCotacaoId implements Serializable {

    @Column(name = "id_cotacao")
    Integer idCotacao;

    @Column(name = "id_grupo_cotacao_produto")
    Integer idGrupoCotacaoProduto;

    public GrupoCotacaoProdutoCotacaoId() {
    }

    public GrupoCotacaoProdutoCotacaoId(Integer idCotacao, Integer idGrupoCotacaoProduto) {
        this.idCotacao = idCotacao;
        this.idGrupoCotacaoProduto = idGrupoCotacaoProduto;
    }

    public Integer getIdCotacao() {
        return idCotacao;
    }

    public void setIdCotacao(Integer idCotacao) {
        this.idCotacao = idCotacao;
    }

    public Integer getIdGrupoCotacaoProduto() {
        return idGrupoCotacaoProduto;
    }

    public void setIdGrupoCotacaoProduto(Integer idGrupoCotacaoProduto) {
        this.idGrupoCotacaoProduto = idGrupoCotacaoProduto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GrupoCotacaoProdutoCotacaoId that = (GrupoCotacaoProdutoCotacaoId) o;
        return idCotacao.equals(that.idCotacao) && idGrupoCotacaoProduto.equals(that.idGrupoCotacaoProduto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCotacao, idGrupoCotacaoProduto);
    }
}
