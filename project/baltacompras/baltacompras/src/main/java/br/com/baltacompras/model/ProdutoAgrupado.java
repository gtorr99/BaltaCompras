package br.com.baltacompras.model;

import java.time.LocalDate;
import java.util.Date;

public class ProdutoAgrupado {
    private Integer idGrupoProduto;
    private Integer idProduto;
    private float quantidadeTotal;
    private Date prazo;

    public ProdutoAgrupado(Integer idGrupoProduto, Integer idProduto, float quantidadeTotal, Date prazo) {
        this.idGrupoProduto = idGrupoProduto;
        this.idProduto= idProduto;
        this.quantidadeTotal = quantidadeTotal;
        this.prazo = prazo;
    }

    public Integer getId_grupo_produto() {
        return idGrupoProduto;
    }
    public Integer getId_produto() {
        return idProduto;
    }
    public float getQuantidadeTotal() {
        return quantidadeTotal;
    }
    public Date getPrazo() {
        return prazo;
    }
}
