package br.com.baltacompras.controller;

import br.com.baltacompras.model.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.Fornecedor;
import br.com.baltacompras.repository.FornecedorCustomRepository;
import br.com.baltacompras.repository.FornecedorRepository;
import br.com.baltacompras.serviceimplement.FornecedorServiceImplement;

import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.domain.In;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

@RestController
@RequestMapping("/fornecedor")
public class FornecedorController {

    @And({
            @Spec(path = "cnpj", spec = Like.class),
            @Spec(path = "nomeFantasia", spec = Like.class),
            @Spec(path = "inscricaoEstadual", spec = Like.class),
            @Spec(path = "razaoSocial", spec = Like.class),
            @Spec(path = "status", spec = In.class),
            @Spec(path = "email", spec = Like.class)
    })
    interface FornecedorSpec<Fornecedor> extends NotDeletedEntity<Fornecedor> {
    }

    @Autowired
    private FornecedorRepository repositorio;

    @Autowired
    private FornecedorCustomRepository customRepo;

    private final FornecedorServiceImplement fornecedorServiceImpl = new FornecedorServiceImplement();

    @GetMapping("/listar-paginado")
    public Page<Fornecedor> listarPaginado(FornecedorSpec<Fornecedor> spec, Pageable page) {
        return repositorio.findAll(spec, page);
    }

    @GetMapping("/validarCnpj/{cnpj}")
    public boolean validarCnpj(@PathVariable String cnpj) {
        return fornecedorServiceImpl.validarCnpj(cnpj);
    }

    @PostMapping(value = "/salvar")
    public ResponseEntity<?> salvar(@RequestBody Fornecedor fornecedor) {
        if (!fornecedorServiceImpl.validarCnpj(fornecedor.getCnpj())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CNPJ inválido! - " + fornecedorServiceImpl.formataCnpj(fornecedor.getCnpj()));
        } else if (!fornecedorServiceImpl.validarUf(fornecedor.getEstado())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("UF inválido! - " + fornecedor.getEstado());
        }

        fornecedor.setStatus(Status.ATIVO);
        fornecedor.setCnpj(fornecedorServiceImpl.formataCnpj(fornecedor.getCnpj()));
        fornecedor.setInscricaoEstadual(fornecedorServiceImpl.formataInscricaoEstadual(fornecedor.getInscricaoEstadual()));

        try {
            repositorio.save(fornecedor);
            return ResponseEntity.status(HttpStatus.CREATED).body("Fornecedor cadastrado com sucesso!");
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CNPJ ou Inscrição estadual duplicadas!");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno");
        }
    }

    @PutMapping(value = "/alterar")
    public ResponseEntity<?> alterar(@RequestBody Fornecedor fornecedor) {
        if (fornecedor.getId() > 0) {
            repositorio.save(fornecedor);
            return ResponseEntity.status(HttpStatus.OK).body("Dados do fornecedor alterados com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fornecedor não encontrado");
    }

    @DeleteMapping("/excluir/{id}")
    public Boolean excluir(@PathVariable Integer id) {
        Fornecedor fornecedorSalvo = repositorio.getById(id);
        fornecedorSalvo.setStatus(Status.DELETADO);
        repositorio.save(fornecedorSalvo);
        return true;
    }

//    @GetMapping("/filtrar")
//    public Page<Fornecedor> filtrar(@RequestParam(value = "id", required = false) Integer id,
//            @RequestParam(value = "cnpj", required = false) String cnpj,
//            @RequestParam(value = "inscricaoEstadual", required = false) String inscricaoEstadual,
//            @RequestParam(value = "razaoSocial", required = false) String razaoSocial,
//            @RequestParam(value = "nomeFantasia", required = false) String nomeFantasia,
//            @RequestParam(value = "status", required = false) String status,
//            @RequestParam(value = "email", required = false) String email,
//            @RequestParam(value = "telefone", required = false) String telefone,
//            @RequestParam(value = "cep", required = false) String cep,
//            @RequestParam(value = "rua", required = false) String rua,
//            @RequestParam(value = "numero", required = false) String numero,
//            @RequestParam(value = "complemento", required = false) String complemento,
//            @RequestParam(value = "bairro", required = false) String bairro,
//            @RequestParam(value = "cidade", required = false) String cidade,
//            @RequestParam(value = "estado", required = false) String estado) {
//
//        return customRepo.filtrar(id, cnpj, inscricaoEstadual, razaoSocial, nomeFantasia, status, email, telefone, cep,
//                rua, numero, complemento, bairro, cidade, estado);
//    }
}
