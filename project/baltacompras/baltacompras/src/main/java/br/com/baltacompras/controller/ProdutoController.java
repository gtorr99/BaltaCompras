package br.com.baltacompras.controller;

import java.util.List;

import net.kaczmarzyk.spring.data.jpa.domain.*;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.Produto;
import br.com.baltacompras.repository.ProdutoRepository;

import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Join(path = "grupoProduto", alias = "gp")
    @Or({
            @Spec(path = "id", params="filtro", spec = Equal.class),
            @Spec(path = "descricao", params="filtro", spec = LikeIgnoreCase.class),
            @Spec(path = "unMedida", params="filtro", spec = Equal.class),
            @Spec(path = "gp.descricao", params="filtro", spec = LikeIgnoreCase.class)
    })
     @And({
             @Spec(path = "id", params = "idEqual", spec = Equal.class),
             @Spec(path = "id", params = "idNotEqual", spec = NotEqual.class),

             @Spec(path = "unMedida", params = "unMedidaEqual", spec = Equal.class),
             @Spec(path = "unMedida", params = "unMedidaNotEqual", spec = NotEqual.class),

             @Spec(path = "descricao", params = "descricaoLikeIgnoreCase", spec = LikeIgnoreCase.class),
             @Spec(path = "descricao", params = "descricaoEqualIgnoreCase", spec = EqualIgnoreCase.class),
             @Spec(path = "descricao", params = "descricaoNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class),

             @Spec(path = "gp.descricao", params = "grupoProdutoLikeIgnoreCase", spec = LikeIgnoreCase.class),
             @Spec(path = "gp.descricao", params = "grupoProdutoEqualIgnoreCase", spec = EqualIgnoreCase.class),
             @Spec(path = "gp.descricao", params = "grupoProdutoNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class)
     })
    interface ModelSpec<Produto> extends NotDeletedEntity<Produto> {
    }

    @Autowired
    private ProdutoRepository repositorio;

    @GetMapping("/listar")
    public List<Produto> listar(ModelSpec<Produto> spec){
        return repositorio.findAll(spec);
    }

    @GetMapping("/listar-paginado")
    public Page<Produto> listar(ModelSpec<Produto> spec, Pageable page){
        return repositorio.findAll(spec, page);
    }
    
    @PostMapping("/salvar")
    public void salvar(@RequestBody Produto produto){
        repositorio.save(produto);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody Produto produto) {
        if (produto.getId() > 0) {
            repositorio.save(produto);
            return ResponseEntity.status(HttpStatus.OK).body("Produto atualizado com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado");
    }
}
