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

import br.com.baltacompras.model.FormaPagamento;
import br.com.baltacompras.repository.FormaPagamentoRepository;

@RestController
@RequestMapping("/formapagamento")
public class FormaPagamentoController {
    @Autowired
    private FormaPagamentoRepository repositorio;

    @GetMapping
    public List<FormaPagamento> listar(){
        return repositorio.findAll();
    }
    
    @PostMapping
    public void salvar(@RequestBody FormaPagamento formaPagamento){
        repositorio.save(formaPagamento);
    }

    @PutMapping
    public void alterar(@RequestBody FormaPagamento formaPagamento){
        if(formaPagamento.getId()>0){
            repositorio.save(formaPagamento);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody FormaPagamento formaPagamento){
        repositorio.delete(formaPagamento);
    }

}
