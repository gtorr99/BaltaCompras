package br.com.baltacompras.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RequisicaoProdutoId implements Serializable {

    @Column(name = "id_requisicao")
    Long idRequisicao;

    @Column(name = "id_produto")
    Long idProduto;

    public RequisicaoProdutoId() {
    }

    public RequisicaoProdutoId(Long idRequisicao, Long idProduto) {
        this.idRequisicao = idRequisicao;
        this.idProduto = idProduto;
    }

    public Long getIdRequisicao() {
        return idRequisicao;
    }

    public void setIdRequisicao(Long idRequisicao) {
        this.idRequisicao = idRequisicao;
    }

    public Long getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Long idProduto) {
        this.idProduto = idProduto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RequisicaoProdutoId that = (RequisicaoProdutoId) o;
        return idRequisicao.equals(that.idRequisicao) && idProduto.equals(that.idProduto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRequisicao, idProduto);
    }
}
