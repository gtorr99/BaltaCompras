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

import br.com.baltacompras.model.GrupoCotacao;
import br.com.baltacompras.repository.GrupoCotacaoRepository;
import br.com.baltacompras.serviceimplement.GrupoCotacaoServiceImplement;

@RestController
@RequestMapping("/grupocotacao")
public class GrupoCotacaoController {
    @Autowired
    private GrupoCotacaoRepository repositorio;

    @Autowired
    private GrupoCotacaoServiceImplement grupoCotacaoServiceImplement;

    @GetMapping
    public List<GrupoCotacao> listar(){
        return repositorio.findAll();
    }

    @GetMapping("/gerar-cotacoes")
    public List<GrupoCotacao> gerarCotacoes(){
        return grupoCotacaoServiceImplement.gerarCotacoes();
    }
    
    @PostMapping
    public void salvar(@RequestBody GrupoCotacao grupoCotacao){
        repositorio.save(grupoCotacao);
    }

    @PutMapping
    public void alterar(@RequestBody GrupoCotacao grupoCotacao){
        if(grupoCotacao.getId()>0){
            repositorio.save(grupoCotacao);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody GrupoCotacao grupoCotacao){
        repositorio.delete(grupoCotacao);
    }

}
