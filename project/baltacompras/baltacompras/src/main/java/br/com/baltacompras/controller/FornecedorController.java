package br.com.baltacompras.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.baltacompras.model.Fornecedor;
import br.com.baltacompras.repository.FornecedorCustomRepository;
import br.com.baltacompras.repository.FornecedorRepository;
import br.com.baltacompras.serviceimplement.FornecedorServiceImplement;

@RestController
@RequestMapping("/fornecedor")
public class FornecedorController {
    @Autowired
    private FornecedorRepository repositorio;

    @Autowired
    private FornecedorCustomRepository customRepo;

    private FornecedorServiceImplement fornecedorServiceImpl = new FornecedorServiceImplement();

    @GetMapping("/listar")
    public List<Fornecedor> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/filtrar")
    public List<Fornecedor> filtrar(@RequestParam(value = "id", required = false) Integer id,
            @RequestParam(value = "cnpj", required = false) String cnpj,
            @RequestParam(value = "inscricaoEstadual", required = false) String inscricaoEstadual,
            @RequestParam(value = "razaoSocial", required = false) String razaoSocial,
            @RequestParam(value = "nomeFantasia", required = false) String nomeFantasia,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "telefone", required = false) String telefone,
            @RequestParam(value = "cep", required = false) String cep,
            @RequestParam(value = "rua", required = false) String rua,
            @RequestParam(value = "numero", required = false) String numero,
            @RequestParam(value = "complemento", required = false) String complemento,
            @RequestParam(value = "bairro", required = false) String bairro,
            @RequestParam(value = "cidade", required = false) String cidade,
            @RequestParam(value = "estado", required = false) String estado) {

        return customRepo.filtrar(id, cnpj, inscricaoEstadual, razaoSocial, nomeFantasia, status, email, telefone, cep,
                rua, numero, complemento, bairro, cidade, estado);
    }

    @PostMapping
    public void salvar(@RequestBody Fornecedor fornecedor) {

        if (!fornecedorServiceImpl.validarCnpj(fornecedor.getCnpj())) {
            System.out.println("CNPJ inválido!" + fornecedor.getCnpj());
        } else if (!fornecedorServiceImpl.validarUf(fornecedor.getEstado())) {
            System.out.println("UF inválido! " + fornecedor.getEstado());
        }

        repositorio.save(fornecedor);
    }

    @PutMapping
    public void alterar(@RequestBody Fornecedor fornecedor) {
        if (fornecedor.getId() > 0) {
            repositorio.save(fornecedor);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Fornecedor fornecedor) {
        repositorio.delete(fornecedor);
    }

}
