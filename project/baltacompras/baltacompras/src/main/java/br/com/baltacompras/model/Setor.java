package br.com.baltacompras.model;

import br.com.baltacompras.model.enums.Status;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "setor")
public class Setor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String descricao;
    @OneToMany
    @JoinColumn(name="id_setor", referencedColumnName = "id")
    private Set<CentroCusto> centrosCusto;

    private Status status;

    public Integer getId() {
        return id;
    }
    public Set<CentroCusto> getCentrosCusto() {
        return centrosCusto;
    }
    public void setCentrosCusto(Set<CentroCusto> centrosCusto) {
        this.centrosCusto = centrosCusto;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
