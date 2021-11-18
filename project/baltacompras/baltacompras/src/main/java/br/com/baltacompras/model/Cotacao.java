package br.com.baltacompras.model;

import java.sql.Date;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Type;

import br.com.baltacompras.model.enums.Status;

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
    @Column(name = "forma_pgto")
    private String formasPgto;
    @Column(nullable = false)
    private Status status;
    @Type(type = "text")
    private String observacoes;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne
    @JoinColumn(name = "id_grupo_cotacao")
    private GrupoCotacao grupoCotacao;

    @ManyToOne
    @JoinColumn(name = "id_fornecedor")
    private Fornecedor fornecedor;

    @OneToMany(mappedBy = "cotacao")
    private Set<GrupoCotacaoProdutoCotacao> produtos;

    public GrupoCotacao getGrupoCotacao() {
        return grupoCotacao;
    }
    public void setGrupoCotacao(GrupoCotacao grupoCotacao) {
        this.grupoCotacao = grupoCotacao;
    }
    public Fornecedor getFornecedor() {
        return fornecedor;
    }
    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }
    

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

    public String getFormasPgto() {
        return formasPgto;
    }

    public void setFormasPgto(String formasPgto) {
        this.formasPgto = formasPgto;
    }

    public Set<GrupoCotacaoProdutoCotacao> getProdutos() {
        return produtos;
    }

    public void setProdutos(Set<GrupoCotacaoProdutoCotacao> produtos) {
        this.produtos = produtos;
    }
}
