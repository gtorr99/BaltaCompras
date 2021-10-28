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
@Table(name = "produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String descricao;
    @Column(nullable = false)
    private Integer unMedida;
    @ManyToOne
    @JoinColumn(name = "id_grupo_produto", referencedColumnName = "id")
    private GrupoProduto GrupoProduto;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public Integer getUnMedida() {
        return unMedida;
    }
    public void setUnMedida(Integer unMedida) {
        this.unMedida = unMedida;
    }
    public GrupoProduto getGrupoProduto() {
        return GrupoProduto;
    }
    public void setGrupoProduto(GrupoProduto grupoProduto) {
        GrupoProduto = grupoProduto;
    }

    
}
