package br.com.baltacompras.model;

import br.com.baltacompras.model.enums.Status;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable= false)
    private String nome;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(name = "hash_senha", nullable = false)
    private String hashSenha;
    @Column(nullable = false)
    private Status status;
    @ManyToOne
    @JoinColumn(name = "id_setor", referencedColumnName = "id")
    private Setor setor;
    @ManyToOne
    @JoinColumn(name = "id_funcao", referencedColumnName = "id")
    private Funcao funcao;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getHashSenha() {
        return hashSenha;
    }
    public void setHashSenha(String hashSenha) {
        this.hashSenha = hashSenha;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
    public Setor getSetor() {
        return setor;
    }
    public void setSetor(Setor setor) {
        this.setor = setor;
    }
    public Funcao getFuncao() {
        return funcao;
    }
    public void setFuncao(Funcao funcao) {
        this.funcao = funcao;
    }

    
}
