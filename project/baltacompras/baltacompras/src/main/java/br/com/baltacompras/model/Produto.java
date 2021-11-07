package br.com.baltacompras.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

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
    private GrupoProduto grupoProduto;

    @JsonIgnore
    @OneToMany(mappedBy = "produto")
    private Set<RequisicaoProduto> requisicoes;

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
        return grupoProduto;
    }
    public void setGrupoProduto(GrupoProduto grupoProduto) {
        this.grupoProduto = grupoProduto;
    }

    public Set<RequisicaoProduto> getRequisicoes() {
        return requisicoes;
    }
}
