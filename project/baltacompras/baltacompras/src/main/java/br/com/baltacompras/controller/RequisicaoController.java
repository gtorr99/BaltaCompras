package br.com.baltacompras.controller;

import br.com.baltacompras.model.enums.Status;

import br.com.baltacompras.repository.RequisicaoProdutoRepository;
import net.kaczmarzyk.spring.data.jpa.domain.*;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.Requisicao;
import br.com.baltacompras.repository.RequisicaoRepository;
import br.com.baltacompras.serviceimplement.Email;

import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;

import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping("/requisicao")
public class RequisicaoController {

    @Join(path = "usuario", alias = "u")
    @Join(path = "centroCusto", alias = "cc")
    @Or({
            @Spec(path = "id", params = "filtro", spec = Equal.class),
            @Spec(path = "u.nome", params = "filtro", spec = LikeIgnoreCase.class),
            @Spec(path = "status", params = "filtro", paramSeparator=',', spec = In.class),
            @Spec(path = "cc.descricao", params = "filtro", spec = LikeIgnoreCase.class)
    })
    @And({
            @Spec(path = "id", params = "idEqual", spec = Equal.class),
            @Spec(path = "id", params = "idNotEqual", spec = NotEqual.class),

            @Spec(path = "prazo", params = "prazoEqual", spec = Equal.class, config = "dd/MM/yyyy"),
            @Spec(path = "prazo", params = {"prazoFim", "prazoInicio"}, spec = DateBetween.class, config = "dd/MM/yyyy"),

            @Spec(path = "u.nome", params = "requisitanteLikeIgnoreCase", spec = LikeIgnoreCase.class),
            @Spec(path = "u.nome", params = "requisitanteEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "u.nome", params = "requisitanteNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class),

            @Spec(path = "status", params = "statusEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "status", params = "statusNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class),

            @Spec(path = "cc.descricao", params = "centroCustoEqualIgnoreCase", spec = EqualIgnoreCase.class),
            @Spec(path = "cc.descricao", params = "centroCustoNotEqualIgnoreCase", spec = NotEqualIgnoreCase.class),
            @Spec(path = "cc.descricao", params = "centroCustoLikeIgnoreCase", spec = LikeIgnoreCase.class)
    })
    interface ModelSpec<Requisicao> extends NotDeletedEntity<Requisicao> {
    }

    @Autowired
    private RequisicaoRepository repositorio;


    @Autowired
    private RequisicaoProdutoRepository repositorioReqProd;

    @Autowired
    private Email email;

//    @Autowired
//    private RequisicaoCustomRepository customRepo;

    @GetMapping("/listar-paginado")
    public Page<Requisicao> listarPaginado(ModelSpec<Requisicao> spec, Pageable page) {
        return repositorio.findAll(spec, page);
    }

    @PostMapping("/salvar")
    public void salvar(@RequestBody Requisicao requisicao) {
        requisicao.setStatus(Status.ABERTO);
        Requisicao req = repositorio.save(requisicao);
        requisicao.getProdutos().forEach(p -> { p.getId().setIdRequisicao(req.getId()); p.setRequisicao(req);});
        req.setProdutos(requisicao.getProdutos());
        repositorioReqProd.saveAll(requisicao.getProdutos());
    }

    @PutMapping("/alterar")
    public ResponseEntity<?>  alterar(@RequestBody Requisicao requisicao) {
        if (requisicao.getId() > 0 && requisicao.getStatus() == Status.ABERTO) {

            Requisicao req = repositorio.getById(requisicao.getId());
            repositorioReqProd.deleteAll(req.getProdutos());

            requisicao.getProdutos().forEach(p -> { p.getId().setIdRequisicao(req.getId()); p.setRequisicao(req);});

            req.setProdutos(requisicao.getProdutos());
            req.setPrazo(requisicao.getPrazo());
            req.setObservacoes(requisicao.getObservacoes());
            req.setCentroCusto(requisicao.getCentroCusto());

            repositorioReqProd.saveAll(req.getProdutos());
            repositorio.save(req);
            return ResponseEntity.status(HttpStatus.OK).body("Requisição atualizada com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Requisição não encontrada");
    }

    @PutMapping("/cancelar/{id}")
    public Boolean cancelar(@PathVariable Integer id) {
        Requisicao requisicao = repositorio.getById(id);
        if (requisicao.getId() > 0 && requisicao.getStatus() == Status.ABERTO) {
            requisicao.setStatus(Status.CANCELADO);
            repositorio.save(requisicao);
            return true;
        }
        return false;
    }

    @DeleteMapping("/excluir/{id}")
    public Boolean excluir(@PathVariable Integer id) {
        try {
            Requisicao requisicao = repositorio.getById(id);
            requisicao.setStatus(Status.DELETADO);
            repositorio.save(requisicao);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @PutMapping("/aprovar/{id}")
    public void aprovar(@PathVariable Integer id) {
        Requisicao req = repositorio.getById(id);
        req.setStatus(Status.APROVADO);
        repositorio.save(req);
    }

    @PutMapping("/reprovar/{id}")
    public void reprovar(@PathVariable Integer id) {
        Requisicao req = repositorio.getById(id);
        req.setStatus(Status.REPROVADO);
        repositorio.save(req);
    }

//    @GetMapping("/findbyid")
//    public Optional<Requisicao> buscarPorId(@RequestParam("id") Integer id) {
//        return repositorio.findById(id);
//    }
//
//    @GetMapping("/filterbydate")
//    public List<Requisicao> buscarPorData(@RequestParam("datestart") String dataInicio, @RequestParam("dateend") String dataFim) throws ParseException {
//        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
//        Date dateIni = format.parse(dataInicio);
//        Date dateFim = format.parse(dataFim);
//        return customRepo.filtrarPorData(dateIni, dateFim);
//    }
//
//    @GetMapping("/filtrar")
//    public List<Requisicao> filtrar(
//            @RequestParam(value = "id", required = false) Integer id,
//            @RequestParam(value = "dataInicio", required = false) String dataInicio,
//            @RequestParam(value = "dataFim", required = false) String dataFim,
//            @RequestParam(value = "status", required = false) Integer status,
//            @RequestParam(value = "observacao", required = false) String observacao) throws ParseException {
//        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
//        Date dateIni = null;
//        Date dateFim = null;
//
//        if (dataInicio != null) {
//            dateIni = format.parse(dataInicio);
//        }
//        if (dataFim != null) {
//            dateFim = format.parse(dataFim);
//        }
//
//        return customRepo.filtrar(id, dateIni, dateFim, status, observacao);
//    }
    
    
    @PostMapping("/email")
    public void gerarRelatorio(@RequestParam(value = "link") String link, @RequestParam(value = "destinatarios") String[] destinatarios) throws Exception{
        String mensagem = "<h4>Uma nova requisição está aguardando sua análise!</h4><br><a href=" + link + ">Clique aqui para acessar!</a>";
        String assunto = "Nova Requisição para análise";
        String arquivo = null;
        email.sendEmailWithAttachment(destinatarios, assunto, mensagem, arquivo);
    }
}
