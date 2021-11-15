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

import br.com.baltacompras.model.CentroCusto;
import br.com.baltacompras.repository.CentroCustoRepository;

@RestController
@RequestMapping("/centro-custo")
public class CentroCustoController {
    @Autowired
    private CentroCustoRepository repositorio;

    @GetMapping("/listar")
    public List<CentroCusto> listar(){
        return repositorio.findAll();
    }
    
    @PostMapping("/salvar")
    public void salvar(@RequestBody CentroCusto centroCusto){
        repositorio.save(centroCusto);
    }

     @PutMapping("/alterar")
    public void alterar(@RequestBody CentroCusto centroCusto){
        if(centroCusto.getId()>0){
            repositorio.save(centroCusto);
        }
    }

    @DeleteMapping("/excluir/{id}")
    public void excluir(@RequestBody CentroCusto centroCusto){
        repositorio.delete(centroCusto);
    }
}
