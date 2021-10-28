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

import br.com.baltacompras.model.Fornecedor;
import br.com.baltacompras.repository.FornecedorRepository;
import br.com.baltacompras.serviceimplement.FornecedorServiceImplement;

@RestController
@RequestMapping("/fornecedor")
public class FornecedorController {
    @Autowired
    private FornecedorRepository repositorio;

    private FornecedorServiceImplement fornecedorServiceImpl = new FornecedorServiceImplement();

    @GetMapping
    public List<Fornecedor> listar(){
        return repositorio.findAll();
    }
    
    @PostMapping
    public void salvar(@RequestBody Fornecedor fornecedor){
        
        if(!fornecedorServiceImpl.validarCnpj(fornecedor.getCnpj())){
            System.out.println("CNPJ inválido!" + fornecedor.getCnpj());
        } else if(!fornecedorServiceImpl.validarUf(fornecedor.getEstado())){
            System.out.println("UF inválido! " + fornecedor.getEstado());
        }
        
        repositorio.save(fornecedor);
    }

    @PutMapping
    public void alterar(@RequestBody Fornecedor fornecedor){
        if(fornecedor.getId()>0){
            repositorio.save(fornecedor);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Fornecedor fornecedor){
        repositorio.delete(fornecedor);
    }
    
}
