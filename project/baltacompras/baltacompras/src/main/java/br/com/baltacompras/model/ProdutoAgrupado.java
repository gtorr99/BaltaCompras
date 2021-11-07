package br.com.baltacompras.model;

public class ProdutoAgrupado {
    private Integer idGrupoProduto;
    private Integer idProduto;
    private float quantidadeTotal;

    public ProdutoAgrupado(Integer idGrupoProduto, Integer idProduto, float quantidadeTotal) {
        this.idGrupoProduto = idGrupoProduto;
        this.idProduto= idProduto;
        this.quantidadeTotal = quantidadeTotal;
    }

    public Integer getId_grupo_produto() {
        return idGrupoProduto;
    }
    public void setId_grupo_produto(Integer idGrupoProduto) {
        this.idGrupoProduto = idGrupoProduto;
    }
    public Integer getId_produto() {
        return idProduto;
    }
    public void setId_produto(Integer idProduto) {
        this.idProduto = idProduto;
    }
    public float getQuantidadeTotal() {
        return quantidadeTotal;
    }
    public void setQuantidadeTotal(float quantidadeTotal) {
        this.quantidadeTotal = quantidadeTotal;
    }
    
}
