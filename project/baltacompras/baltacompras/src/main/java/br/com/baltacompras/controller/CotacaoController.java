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

import br.com.baltacompras.model.Cotacao;
import br.com.baltacompras.repository.CotacaoRepository;

@RestController
@RequestMapping("/cotacao")
public class CotacaoController {
    @Autowired
    private CotacaoRepository repositorio;

    @GetMapping
    public List<Cotacao> listar(){
        return repositorio.findAll();
    }
    
    @PostMapping
    public void salvar(@RequestBody Cotacao cotacao){
        repositorio.save(cotacao);
    }

    @PutMapping
    public void alterar(@RequestBody Cotacao cotacao){
        if(cotacao.getId()>0){
            repositorio.save(cotacao);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Cotacao cotacao){
        repositorio.delete(cotacao);
    }
}
