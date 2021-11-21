package br.com.baltacompras.model;

import javax.persistence.*;

public class UsuarioDto {

    @Column(nullable = false, unique = true)
    private String email;
    @Column(name = "hash_senha", nullable = false)
    private String hashSenha;

    public String getEmail() {
        return email;
    }
    public String getHashSenha() {
        return hashSenha;
    }
    
}
