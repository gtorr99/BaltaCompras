package br.com.baltacompras.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.baltacompras.model.Permissao;
import br.com.baltacompras.repository.PermissaoRepository;

@RestController
@RequestMapping("/permissao")
public class PermissaoController {
    @Autowired
    PermissaoRepository repositorio;

    @GetMapping
    public List<Permissao> listar(){
        return repositorio.findAll();
    }

    @PostMapping
    public void salvar(@RequestBody Permissao permissao){
        repositorio.save(permissao);
    }

    @PutMapping
    public void alterar(@RequestBody Permissao permissao){
        if(permissao.getId() > 0){
            repositorio.save(permissao);
        }
    }

    @DeleteMapping
    public void deletar(@RequestBody Permissao permissao){
        repositorio.delete(permissao);
    }
}
