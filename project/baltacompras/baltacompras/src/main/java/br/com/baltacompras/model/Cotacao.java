package br.com.baltacompras.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import br.com.baltacompras.model.enums.Status;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "cotacao")
public class Cotacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private float frete;
    private float desconto;
    @Column(nullable = false)
    private Date prazo;
    private boolean selecionada;
    private String transportadora;
    @Column(name = "meio_transporte")
    private String meioTransporte;
    @Column(nullable = false)
    private Status status;
    @Type(type = "text")
    private String observacoes;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public float getFrete() {
        return frete;
    }
    public void setFrete(float frete) {
        this.frete = frete;
    }
    public float getDesconto() {
        return desconto;
    }
    public void setDesconto(float desconto) {
        this.desconto = desconto;
    }
    public Date getPrazo() {
        return prazo;
    }
    public void setPrazo(Date prazo) {
        this.prazo = prazo;
    }
    public boolean isSelecionada() {
        return selecionada;
    }
    public void setSelecionada(boolean selecionada) {
        this.selecionada = selecionada;
    }
    public String getTransportadora() {
        return transportadora;
    }
    public void setTransportadora(String transportadora) {
        this.transportadora = transportadora;
    }
    public String getMeioTransporte() {
        return meioTransporte;
    }
    public void setMeioTransporte(String meioTransporte) {
        this.meioTransporte = meioTransporte;
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
