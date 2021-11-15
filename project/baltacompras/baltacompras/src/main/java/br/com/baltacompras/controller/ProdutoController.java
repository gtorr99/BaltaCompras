package br.com.baltacompras.controller;

import java.util.List;

import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.Produto;
import br.com.baltacompras.repository.ProdutoRepository;

import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.kaczmarzyk.spring.data.jpa.domain.Like;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Join(path = "grupoProduto", alias = "gp")
    @Or({
            @Spec(path = "descricao", params="produto", spec = Like.class),
            @Spec(path = "gp.descricao", params="grupo", spec = Like.class),
    })
    interface ProdutoSpec<Produto> extends NotDeletedEntity<Produto> {
    }

    @Autowired
    private ProdutoRepository repositorio;

    @GetMapping("/listar")
    public List<Produto> listar(ProdutoSpec<Produto> spec){
        return repositorio.findAll(spec);
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
