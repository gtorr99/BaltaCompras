package br.com.baltacompras.controller;

import br.com.baltacompras.model.enums.Status;
import net.kaczmarzyk.spring.data.jpa.domain.*;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.Fornecedor;
import br.com.baltacompras.repository.FornecedorCustomRepository;
import br.com.baltacompras.repository.FornecedorRepository;
import br.com.baltacompras.serviceimplement.FornecedorServiceImplement;

import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

import java.util.List;

@RestController
@RequestMapping("/fornecedor")
public class FornecedorController {

    @Join(path = "gruposProduto", alias = "gp")
    @Or({
            @Spec(path = "cnpj", params = "filtro", spec = LikeIgnoreCase.class),
            @Spec(path = "nomeFantasia", params = "filtro", spec = LikeIgnoreCase.class),
            @Spec(path = "status", params = "filtro", spec = In.class),
            @Spec(path = "email", params = "filtro", spec = LikeIgnoreCase.class),
            @Spec(path = "telefone", spec = LikeIgnoreCase.class),
            @Spec(path = "gp.descricao", params = "filtro", spec = LikeIgnoreCase.class)
    })
    @And({
            @Spec(path = "cnpj", params = "cnpjLikeIgnoreCase", spec = LikeIgnoreCase.class),
            @Spec(path = "cnpj", params = "cnpjEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "cnpj", params = "cnpjNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class),
            @Spec(path = "nomeFantasia", params = "nomeFantasiaLikeIgnoreCase", spec = LikeIgnoreCase.class),
            @Spec(path = "nomeFantasia", params = "nomeFantasiaEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "nomeFantasia", params = "nomeFantasiaNotEqualLikeIgnoreCase", spec = NotEqualIgnoreCase.class),
            @Spec(path = "status", params = "statusEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "status", params = "statusNotEqual", spec = NotEqualIgnoreCase.class),
            @Spec(path = "email", params = "emailLikeIgnoreCase", spec = LikeIgnoreCase.class),
            @Spec(path = "email", params = "emailEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "email", params = "emailNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class),
            @Spec(path = "telefone", params = "telefoneLikeIgnoreCase", spec = LikeIgnoreCase.class),
            @Spec(path = "telefone", params = "telefoneEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "telefone", params = "telefoneNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class),
            @Spec(path = "gp.descricao", params="grupoProdutoLikeIgnoreCase", spec = LikeIgnoreCase.class),
            @Spec(path = "gp.descricao", params="grupoProdutoEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "gp.descricao", params="grupoProdutoNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class)
    })
    interface ModelSpec<Fornecedor> extends NotDeletedEntity<Fornecedor> {
    }

    @Autowired
    private FornecedorRepository repositorio;

//    @Autowired
//    private FornecedorCustomRepository customRepo;

    private final FornecedorServiceImplement fornecedorServiceImpl = new FornecedorServiceImplement();

    @GetMapping("/listar-paginado")
    public Page<Fornecedor> listarPaginado(ModelSpec<Fornecedor> spec, Pageable page) {
        return repositorio.findAll(spec, page);
    }

    @GetMapping("/listar")
    public List<Fornecedor> listar(ModelSpec<Fornecedor> spec) {
        return repositorio.findAll(spec);
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
            return ResponseEntity.status(HttpStatus.OK).body("Dados do fornecedor atualizados com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fornecedor não encontrado");
    }

    @DeleteMapping("/excluir/{id}")
    public Boolean excluir(@PathVariable Integer id) {
        try {
            Fornecedor fornecedorSalvo = repositorio.getById(id);
            fornecedorSalvo.setStatus(Status.DELETADO);
            repositorio.save(fornecedorSalvo);
            return true;
        } catch (Exception ex) {
            return false;
        }
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
