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

import br.com.baltacompras.model.RequisicaoProduto;
import br.com.baltacompras.repository.RequisicaoProdutoRepository;

@RestController
@RequestMapping("/requisicaoproduto")
public class RequisicaoProdutoController {
    @Autowired
    private RequisicaoProdutoRepository repositorio;

    @GetMapping
    public List<RequisicaoProduto> listar(){
        return repositorio.findAll();
    }
    
    @PostMapping
    public void salvar(@RequestBody RequisicaoProduto requisicaoProduto){
        repositorio.save(requisicaoProduto);
    }

    @PutMapping
    public void alterar(@RequestBody RequisicaoProduto requisicaoProduto){
        if(requisicaoProduto.getId() != null){
            repositorio.save(requisicaoProduto);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody RequisicaoProduto requisicaoProduto){
        repositorio.delete(requisicaoProduto);
    }
}
