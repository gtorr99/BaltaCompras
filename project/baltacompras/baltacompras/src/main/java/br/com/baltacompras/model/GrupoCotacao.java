package br.com.baltacompras.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.*;

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
    private LocalDate prazoSolicitado;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_grupo_produto", referencedColumnName = "id")
    private GrupoProduto grupoProduto;

    @Type(type = "text")
    private String observacoes;
    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;

    public GrupoCotacao() {}

    public GrupoCotacao(LocalDate prazoSolicitado, GrupoProduto grupoProduto) {
        this.data = new Date();
        this.prazoSolicitado = prazoSolicitado;
        this.grupoProduto = grupoProduto;
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
    public LocalDate getPrazoSolicitado() {
        return prazoSolicitado;
    }
    public void setPrazoSolicitado(LocalDate prazoSolicitado) {
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

}
