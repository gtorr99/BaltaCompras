package br.com.baltacompras.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "centro_custo")
public class CentroCusto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "descricao")
    private String descricao;

    @Column(nullable = false, name = "valor_gasto")
    private Float valorGasto;

    @Column(nullable = false, name = "valor_limite")
    private Float valorLimite;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="id_setor", referencedColumnName = "id")
    private Setor setor;

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

    public Float getValorGasto() {
        return valorGasto;
    }

    public void setValorGasto(Float valorGasto) {
        this.valorGasto = valorGasto;
    }

    public Float getValorLimite() {
        return valorLimite;
    }

    public void setValorLimite(Float valorLimite) {
        this.valorLimite = valorLimite;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

    
}
