package br.com.baltacompras.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import br.com.baltacompras.model.GrupoCotacao;
import br.com.baltacompras.model.GrupoCotacaoProdutoCotacao;
import br.com.baltacompras.model.enums.Status;
import br.com.baltacompras.repository.GrupoCotacaoProdutoCotacaoRepository;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.baltacompras.model.Cotacao;
import br.com.baltacompras.repository.CotacaoCustomRepository;
import br.com.baltacompras.repository.CotacaoRepository;

@RestController
@RequestMapping("/cotacao")
public class CotacaoController {

    @Join(path = "grupoCotacao", alias = "gc")
    @And({
            @Spec(path = "gc.id", params = "grupoCotacao", spec = Equal.class),
            @Spec(path = "selecionada", params = "selecionada", spec = Equal.class),
            @Spec(path = "id", params = "id", spec = Equal.class),
    })
    interface CotacaoSpec<Cotacao> extends NotDeletedEntity<Cotacao> {
    }

    @Autowired
    private CotacaoRepository repositorio;

    @Autowired
    private GrupoCotacaoProdutoCotacaoRepository repositorioGCPC;

    @Autowired
    private CotacaoCustomRepository customRepo;

    @GetMapping("/listar")
    public List<Cotacao> listar(CotacaoSpec<Cotacao> spec){
        return repositorio.findAll(spec);
    }

    @PostMapping("/salvar")
    public void salvar(@RequestBody Cotacao cotacao){
        cotacao.setStatus(Status.ABERTO);
        cotacao.setGrupoCotacao(cotacao.getGrupoCotacao());
        Cotacao cot = repositorio.save(cotacao);
        cotacao.getProdutos().forEach(p -> { p.getId().setIdCotacao(cot.getId()); p.setCotacao(cot);});

        cot.setProdutos(cotacao.getProdutos());
        repositorioGCPC.saveAll(cotacao.getProdutos());
    }

    @PutMapping("/alterar")
    public void alterar(@RequestBody Cotacao cotacao){
        if(cotacao.getId()>0){
            Cotacao cot = repositorio.getById(cotacao.getId());

            cot.setFormasPgto(cotacao.getFormasPgto());
            cot.setDesconto(cotacao.getDesconto());
            cot.setStatus(Status.EM_PROCESSAMENTO);
            cot.setFornecedor(cotacao.getFornecedor());
            cot.setProdutos(cotacao.getProdutos());
            cotacao.setGrupoCotacao(cot.getGrupoCotacao());

            repositorioGCPC.saveAll(cot.getProdutos());
            repositorio.save(cotacao);
        }
    }

    @GetMapping("/filtrar")
    public List<Cotacao> filtrar(
        @RequestParam(value = "id", required = false) Integer id,
        @RequestParam(value = "prazoInicial", required = false) String prazoInicio,
        @RequestParam(value = "prazoFim", required = false) String prazoFim,
        @RequestParam(value = "selecionada", required = false) Integer selecionada,
        @RequestParam(value = "transportadora", required = false) String transportadora,
        @RequestParam(value = "meioTransporte", required = false) String meioTransporte,
        @RequestParam(value = "status", required = false) Integer status,
        @RequestParam(value = "observacoes", required = false) String observacoes) throws ParseException{

        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        Date dateInicio = null;
        Date dateFim = null;

        if(prazoInicio != null){
            dateInicio = format.parse(prazoInicio);
        }

        if(prazoFim != null){
            dateFim = format.parse(prazoFim);
        }

        return customRepo.filtrar(id, dateInicio, dateFim, selecionada, transportadora, meioTransporte, status, observacoes);
    }

    @DeleteMapping
    public void excluir(@RequestBody Cotacao cotacao){
        repositorio.delete(cotacao);
    }

    @PostMapping("/email")
    public void enviarEmail(@RequestParam(value = "id", required = false) Integer id){

    }
}
