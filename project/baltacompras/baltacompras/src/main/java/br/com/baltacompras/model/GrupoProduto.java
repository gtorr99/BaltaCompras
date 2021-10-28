package br.com.baltacompras.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "grupo_produto")
public class GrupoProduto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String descricao;
    @JsonIgnore
    @ManyToMany(mappedBy = "gruposProduto")
    private Set<Fornecedor> gruposProduto;
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
    public Set<Fornecedor> getGruposProduto() {
        return gruposProduto;
    }
    public void setGruposProduto(Set<Fornecedor> gruposProduto) {
        this.gruposProduto = gruposProduto;
    }
}
