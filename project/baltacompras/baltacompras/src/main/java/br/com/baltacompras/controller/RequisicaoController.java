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

import br.com.baltacompras.model.Requisicao;
import br.com.baltacompras.repository.RequisicaoRepository;

@RestController
@RequestMapping("/requisicao")
public class RequisicaoController {
    @Autowired
    private RequisicaoRepository repositorio;

    @GetMapping
    public List<Requisicao> listar(){
        return repositorio.findAll();
    }
    
    @PostMapping
    public void salvar(@RequestBody Requisicao requisicao){
        repositorio.save(requisicao);
    }

    @PutMapping
    public void alterar(@RequestBody Requisicao requisicao){
        if(requisicao.getId()>0){
            repositorio.save(requisicao);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Requisicao requisicao){
        repositorio.delete(requisicao);
    }
}
