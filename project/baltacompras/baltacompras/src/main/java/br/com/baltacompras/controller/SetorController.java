package br.com.baltacompras.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.baltacompras.model.Setor;
import br.com.baltacompras.repository.SetorRepository;

@RestController
@RequestMapping("/setor")
public class SetorController {
    
    @Autowired
    private SetorRepository repositorio;

    @GetMapping("/listar")
    public List<Setor> listar(){
        return repositorio.findAll();
    }

    @Transactional
    @PostMapping("/salvar")
    public void salvar(@RequestBody Setor setor){
        repositorio.save(setor);
    }

    @Transactional
    @PutMapping("/alterar")
    public void alterar(@RequestBody Setor setor){
        if(setor.getId()>0){
            repositorio.save(setor);
        }
    }

    @Transactional
    @DeleteMapping("/excluir/{id}")
    public void excluir(@RequestBody Setor setor){
        repositorio.delete(setor);
    }
}
