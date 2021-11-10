package br.com.baltacompras.model;

import br.com.baltacompras.model.enums.Status;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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

    
}
