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

import br.com.baltacompras.model.OrdemCompra;
import br.com.baltacompras.repository.OrdemCompraRepository;

@RestController
@RequestMapping("/ordemcompra")
public class OrdemCompraController {
    @Autowired
    private OrdemCompraRepository repositorio;

    @GetMapping
    public List<OrdemCompra> listar(){
        return repositorio.findAll();
    }
    
    @PostMapping
    public void salvar(@RequestBody OrdemCompra ordemCompra){
        repositorio.save(ordemCompra);
    }

    @PutMapping
    public void alterar(@RequestBody OrdemCompra ordemCompra){
        if(ordemCompra.getId()>0){
            repositorio.save(ordemCompra);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody OrdemCompra ordemCompra){
        repositorio.delete(ordemCompra);
    }
}
