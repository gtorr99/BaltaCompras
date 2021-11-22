package br.com.baltacompras.controller;

import java.util.List;

import br.com.baltacompras.model.Usuario;
import br.com.baltacompras.model.enums.Status;
import net.kaczmarzyk.spring.data.jpa.domain.*;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.GrupoCotacao;
import br.com.baltacompras.repository.GrupoCotacaoRepository;
import br.com.baltacompras.serviceimplement.Email;
import br.com.baltacompras.serviceimplement.GrupoCotacaoServiceImplement;

@RestController
@RequestMapping("/grupo-cotacao")
public class GrupoCotacaoController {

    @Join(path = "usuario", alias = "u")
    @Join(path = "grupoProduto", alias = "gp")
    @Or({
            @Spec(path = "id", params = "filtro", spec = Equal.class),
            @Spec(path = "prazoSolicitado", params = "filtro", spec = Equal.class, config = "dd/MM/yyyy"),
            @Spec(path = "u.nome", params = "filtro", spec = LikeIgnoreCase.class),
            @Spec(path = "gp.descricao", params = "filtro", spec = LikeIgnoreCase.class),
            @Spec(path = "status", params = "filtro", paramSeparator=',', spec = In.class),
    })
    @And({
            @Spec(path = "id", params = "idEqual", spec = Equal.class),
            @Spec(path = "id", params = "idNotEqual", spec = NotEqual.class),
            @Spec(path = "prazoSolicitado", params = "prazoEqual", spec = Equal.class, config = "dd-MM-yyyy"),
            @Spec(path = "prazoSolicitado", params = {"prazoFim", "prazoInicio"}, spec = Between.class),
            @Spec(path = "status", params = "statusEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "status", params = "statusNotEqual", spec = NotEqualIgnoreCase.class),
            @Spec(path = "u.nome", params = "usuarioLikeIgnoreCase", spec = LikeIgnoreCase.class),
            @Spec(path = "u.nome", params = "usuarioEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "u.nome", params = "usuarioNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class),
            @Spec(path = "gp.descricao", params = "grupoProdutoLikeIgnoreCase", spec = LikeIgnoreCase.class),
            @Spec(path = "gp.descricao", params = "grupoProdutoEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "gp.descricao", params = "grupoProdutoNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class)
    })
    interface ModelSpec<GrupoCotacao> extends NotDeletedEntity<GrupoCotacao> {
    }

    @Autowired
    private GrupoCotacaoRepository repositorio;

    @Autowired
    private GrupoCotacaoServiceImplement grupoCotacaoServiceImplement;

    @Autowired
    private Email email;

    @GetMapping("/listar")
    public List<GrupoCotacao> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/listar-paginado")
    public Page<GrupoCotacao> listarPaginado(ModelSpec<GrupoCotacao> spec, Pageable page) {
        return repositorio.findAll(spec, page);
    }

    @PostMapping("/gerar-cotacoes")
    public void gerarCotacoes(@RequestBody Usuario usuario) {
        grupoCotacaoServiceImplement.gerarCotacoes(usuario);
    }

    @PostMapping("/salvar")
    public void salvar(@RequestBody GrupoCotacao grupoCotacao) {
        repositorio.save(grupoCotacao);
    }

    @PutMapping("/alterar")
    public void alterar(@RequestBody GrupoCotacao grupoCotacao) {
        if (grupoCotacao.getId() > 0 && grupoCotacao.getStatus() == Status.ABERTO) {
            GrupoCotacao grupoCotacaoSalvo = repositorio.getById(grupoCotacao.getId());
            grupoCotacaoSalvo.setObservacoes(grupoCotacao.getObservacoes());
            repositorio.save(grupoCotacaoSalvo);
        }
    }

    @PutMapping("/cancelar/{id}")
    public Boolean cancelar(@PathVariable Integer id) {
        GrupoCotacao grupoCotacao = repositorio.getById(id);
        if (grupoCotacao.getId() > 0 && grupoCotacao.getStatus() == Status.ABERTO) {
            grupoCotacao.setStatus(Status.CANCELADO);
            repositorio.save(grupoCotacao);
            return true;
        }
        return false;
    }

    @DeleteMapping("/excluir/{id}")
    public Boolean excluir(@PathVariable Integer id) {
        try {
            GrupoCotacao grupoCotacao = repositorio.getById(id);
            grupoCotacao.setStatus(Status.DELETADO);
            repositorio.save(grupoCotacao);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @PostMapping("/email")
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
