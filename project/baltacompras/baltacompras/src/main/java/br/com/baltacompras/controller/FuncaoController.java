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

import br.com.baltacompras.model.Funcao;
import br.com.baltacompras.repository.FuncaoRepository;


@RestController
@RequestMapping("/funcao")
public class FuncaoController {
    @Autowired
    FuncaoRepository repositorio;

    @GetMapping
    public List<Funcao> listar(){
        return repositorio.findAll();
    }

    @PostMapping
    public void salvar(@RequestBody Funcao funcao){
        repositorio.save(funcao);
    }

    @PutMapping
    public void alterar(@RequestBody Funcao funcao){
        if(funcao.getId() > 0){
            repositorio.save(funcao);
        }
    }

    @DeleteMapping
    public void deletar(@RequestBody Funcao funcao){
        repositorio.delete(funcao);
    }
}
