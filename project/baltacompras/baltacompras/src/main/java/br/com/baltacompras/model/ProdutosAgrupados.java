package br.com.baltacompras.model;

public class ProdutosAgrupados {
    private Integer id_grupo_produto;
    private Integer id_produto;
    private float quantidadeTotal;

    public Integer getId_grupo_produto() {
        return id_grupo_produto;
    }
    public void setId_grupo_produto(Integer id_grupo_produto) {
        this.id_grupo_produto = id_grupo_produto;
    }
    public Integer getId_produto() {
        return id_produto;
    }
    public void setId_produto(Integer id_produto) {
        this.id_produto = id_produto;
    }
    public float getQuantidadeTotal() {
        return quantidadeTotal;
    }
    public void setQuantidadeTotal(float quantidadeTotal) {
        this.quantidadeTotal = quantidadeTotal;
    }
    
}
