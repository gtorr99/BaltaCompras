package br.com.baltacompras.controller;

import java.util.List;

import net.kaczmarzyk.spring.data.jpa.domain.*;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.baltacompras.model.GrupoCotacao;
import br.com.baltacompras.repository.GrupoCotacaoRepository;
import br.com.baltacompras.serviceimplement.Email;
import br.com.baltacompras.serviceimplement.GrupoCotacaoServiceImplement;

@RestController
@RequestMapping("/grupo-cotacao")
public class GrupoCotacaoController {

    @Join(path = "usuario", alias = "u")
    @Or({
            @Spec(path = "id", spec = LikeIgnoreCase.class),
            @Spec(path="prazo", params="prazo", spec = Equal.class),
            @Spec(path="data", params="data", spec = Equal.class),
            @Spec(path="u.nome", params="comprador", spec = LikeIgnoreCase.class),
            @Spec(path = "status", spec = In.class)
    })
    @And({
            @Spec(path = "id", params = "idLikeIgnoreCase", spec = LikeIgnoreCase.class),
            @Spec(path = "id", params = "idEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "id", params = "idNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class),
            @Spec(path = "data", params = "dataEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "data", params = {"dataFim", "dataInicio"}, spec = Between.class),
            @Spec(path = "prazo", params = "prazoEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "prazo", params = {"prazoFim", "prazoInicio"}, spec = Between.class),
            @Spec(path = "status", params = "statusEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "status", params = "statusNotEqual", spec = NotEqualIgnoreCase.class),
            @Spec(path = "u.nome", params="usuarioLikeIgnoreCase", spec = LikeIgnoreCase.class),
            @Spec(path = "u.nome", params="usuarioEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "u.nome", params="usuarioNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class)
    })
    interface GrupoCotacaoSpec<GrupoCotacao> extends NotDeletedEntity<GrupoCotacao> {
    }

    @GetMapping("/listar-paginado")
    public Page<GrupoCotacao> listarPaginado(GrupoCotacaoSpec<GrupoCotacao> spec, Pageable page) {
        Page<GrupoCotacao> gc = repositorio.findAll(spec, page);
        System.out.println(gc);
        return gc;
    }

    @Autowired
    private GrupoCotacaoRepository repositorio;

    @Autowired
    private GrupoCotacaoServiceImplement grupoCotacaoServiceImplement;

    @Autowired
    private Email email;

    @GetMapping
    public List<GrupoCotacao> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/gerar-cotacoes")
    public List<GrupoCotacao> gerarCotacoes() {
        return grupoCotacaoServiceImplement.gerarCotacoes();
    }

    @PostMapping
    public void salvar(@RequestBody GrupoCotacao grupoCotacao) {
        repositorio.save(grupoCotacao);
    }

    @PutMapping
    public void alterar(@RequestBody GrupoCotacao grupoCotacao) {
        if (grupoCotacao.getId() > 0) {
            repositorio.save(grupoCotacao);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody GrupoCotacao grupoCotacao) {
        repositorio.delete(grupoCotacao);
    }

    @PostMapping("/email-para-fornecedor")
    public void enviarEmailParaFornecedor(@RequestParam(value = "link") String link,
            @RequestParam(value = "destinatarios") String[] destinatarios,
            @RequestParam(value = "mensagem") String mensagem,
            @RequestParam(value = "assunto") String assunto) throws Exception {
        if (link != null) {
            mensagem += "<br><br><a href=" + link + ">Clique aqui para acessar a Cotação</a>";
        }
        String arquivo = null;
        email.sendEmailWithAttachment(destinatarios, assunto, mensagem, arquivo);
    }
    
    @PostMapping("/email-para-comprador")
    public void enviarEmailParaComprador(@RequestParam(value = "link") String link,
            @RequestParam(value = "destinatarios") String[] destinatarios,
            @RequestParam(value = "mensagem") String mensagem,
            @RequestParam(value = "assunto") String assunto) throws Exception {
        if (link != null) {
            mensagem += "<br><br><a href=" + link + ">Clique aqui para acessar a Cotação preenchida</a>";
        }
        String arquivo = null;
        email.sendEmailWithAttachment(destinatarios, assunto, mensagem, arquivo);
    }

}
