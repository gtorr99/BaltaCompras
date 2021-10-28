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

import br.com.baltacompras.model.GrupoCotacaoProduto;
import br.com.baltacompras.repository.GrupoCotacaoProdutoRepository;

@RestController
@RequestMapping("/grupocotacaoproduto")
public class GrupoCotacaoProdutoController {
    @Autowired
    private GrupoCotacaoProdutoRepository repositorio;

    @GetMapping
    public List<GrupoCotacaoProduto> listar(){
        return repositorio.findAll();
    }
    
    @PostMapping
    public void salvar(@RequestBody GrupoCotacaoProduto grupoCotacaoProduto){
        repositorio.save(grupoCotacaoProduto);
    }

    @PutMapping
    public void alterar(@RequestBody GrupoCotacaoProduto grupoCotacaoProduto){
        if(grupoCotacaoProduto.getId()>0){
            repositorio.save(grupoCotacaoProduto);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody GrupoCotacaoProduto grupoCotacaoProduto){
        repositorio.delete(grupoCotacaoProduto);
    }
}
