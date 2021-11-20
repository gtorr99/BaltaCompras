package br.com.baltacompras.model;

import br.com.baltacompras.model.enums.Status;

import java.sql.Date;

import javax.persistence.*;

@Entity
@Table(name = "ordem_compra")
public class OrdemCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Date data;
    @Column(name = "tipo_compra", nullable = false)
    private Integer tipoCompra;
    @Column(nullable = false)
    private Status status;
    private String observacoes;

    @OneToOne
    @JoinColumn(name = "id_cotacao", referencedColumnName = "id")
    private Cotacao cotacao;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;

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
    public Integer getTipoCompra() {
        return tipoCompra;
    }
    public void setTipoCompra(Integer tipoCompra) {
        this.tipoCompra = tipoCompra;
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

    public Cotacao getCotacao() {
        return cotacao;
    }

    public void setCotacao(Cotacao cotacao) {
        this.cotacao = cotacao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
