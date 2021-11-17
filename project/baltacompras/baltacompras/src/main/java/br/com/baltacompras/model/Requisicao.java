package br.com.baltacompras.model;

import br.com.baltacompras.model.enums.Status;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "requisicao")
public class Requisicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Date data;
    @Column(nullable = false)
    private Date prazo;
    @Column(nullable = false)
    private Status status;
    private String observacoes;
    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "id_centro_custo", referencedColumnName = "id")
    private CentroCusto centroCusto;

    @OneToMany(mappedBy = "requisicao")
    private Set<RequisicaoProduto> produtos;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Date getData() {
        return data;
    }
    public void setData(Date data) {
        this.data = data;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
    public String getObservacoes() {
        return observacoes;
    }
    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    public CentroCusto getCentroCusto() {
        return centroCusto;
    }
    public void setCentroCusto(CentroCusto centroCusto) {
        this.centroCusto = centroCusto;
    }

    public Set<RequisicaoProduto> getProdutos() {
        return produtos;
    }
    public void setProdutos(Set<RequisicaoProduto> produtos) {
        this.produtos = produtos;
    }

    public Date getPrazo() {
        return prazo;
    }

    public void setPrazo(Date prazo) {
        this.prazo = prazo;
    }

}
