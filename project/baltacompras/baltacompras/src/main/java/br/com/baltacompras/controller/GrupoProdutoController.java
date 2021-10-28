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

import br.com.baltacompras.model.GrupoProduto;
import br.com.baltacompras.repository.GrupoProdutoRepository;

@RestController
@RequestMapping("/grupoproduto")
public class GrupoProdutoController {
    @Autowired
    private GrupoProdutoRepository repositorio;

    @GetMapping
    public List<GrupoProduto> listar(){
        return repositorio.findAll();
    }
    
    @PostMapping
    public void salvar(@RequestBody GrupoProduto grupoProduto){
        repositorio.save(grupoProduto);
    }

    @PutMapping
    public void alterar(@RequestBody GrupoProduto grupoProduto){
        if(grupoProduto.getId()>0){
            repositorio.save(grupoProduto);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody GrupoProduto grupoProduto){
        repositorio.delete(grupoProduto);
    }

}
