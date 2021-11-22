package br.com.baltacompras.model;

import br.com.baltacompras.model.enums.Status;
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
    private Integer unMedida;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_grupo_produto", referencedColumnName = "id")
    private GrupoProduto grupoProduto;

    @JsonIgnore
    @OneToMany(mappedBy = "produto")
    private Set<RequisicaoProduto> requisicoes;

    private Status status;

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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
