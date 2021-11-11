package br.com.baltacompras.controller;

import java.util.List;

import br.com.baltacompras.model.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.GrupoProduto;
import br.com.baltacompras.repository.GrupoProdutoRepository;

import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

@RestController
@RequestMapping("/grupo-produto")
public class GrupoProdutoController {

    @And({
            @Spec(path = "descricao", spec = Like.class),
            @Spec(path = "status", spec = Equal.class),
    })
    interface GrupoProdutoSpec<GrupoProduto> extends NotDeletedEntity<GrupoProduto> {
    }

    @Autowired
    private GrupoProdutoRepository repositorio;

    @GetMapping("/listar")
    public List<GrupoProduto> listar(GrupoProdutoSpec<GrupoProduto> spec) {
        return repositorio.findAll(spec);
    }

    @PostMapping(value = "/salvar")
    public void salvar(@RequestBody GrupoProduto grupoProduto) {
        repositorio.save(grupoProduto);
    }

    @DeleteMapping("/excluir/{id}")
    public Boolean excluir(@PathVariable Integer id) {
        GrupoProduto grupoProduto = repositorio.getById(id);
        grupoProduto.setStatus(Status.INATIVO);
        repositorio.save(grupoProduto);
        return true;
    }

}
