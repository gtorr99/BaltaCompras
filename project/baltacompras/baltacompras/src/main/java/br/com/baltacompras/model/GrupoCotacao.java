package br.com.baltacompras.model;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import javax.persistence.*;

import br.com.baltacompras.model.enums.Status;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "grupo_cotacao")
public class GrupoCotacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Date data;
    @Column(name = "prazo_solicitado")
    private Date prazoSolicitado;

    private Status status;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    (fetch = FetchType.EAGER)
    @JoinColumn(name = "id_grupo_produto", referencedColumnName = "id")
    private GrupoProduto grupoProduto;

    @OneToMany(mappedBy = "grupoCotacao")
    private Set<Cotacao> cotacoes;


    @OneToMany(mappedBy = "grupoCotacao")
    private Set<GrupoCotacaoProduto> grupoCotacaoProdutos;

    @Type(type = "text")
    private String observacoes;
    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;

    public GrupoCotacao() {}

    public GrupoCotacao(Date prazoSolicitado, GrupoProduto grupoProduto) {
        this.data = new Date();
        this.prazoSolicitado = prazoSolicitado;
        this.grupoProduto = grupoProduto;
        this.status = Status.ABERTO;
        // ToDo - Setar usuário logado
    }

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
    public Date getPrazoSolicitado() {
        return prazoSolicitado;
    }
    public void setPrazoSolicitado(Date prazoSolicitado) {
        this.prazoSolicitado = prazoSolicitado;
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

    public GrupoProduto getGrupoProduto() {
        return grupoProduto;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setGrupoProduto(GrupoProduto grupoProduto) {
        this.grupoProduto = grupoProduto;
    }

    public Set<Cotacao> getCotacoes() {
        return cotacoes;
    }

    public void setCotacoes(Set<Cotacao> cotacoes) {
        this.cotacoes = cotacoes;
    }

    public Set<GrupoCotacaoProduto> getGrupoCotacaoProdutos() {
        return grupoCotacaoProdutos;
    }

    public void setGrupoCotacaoProdutos(Set<GrupoCotacaoProduto> grupoCotacaoProdutos) {
        this.grupoCotacaoProdutos = grupoCotacaoProdutos;
    }
}

