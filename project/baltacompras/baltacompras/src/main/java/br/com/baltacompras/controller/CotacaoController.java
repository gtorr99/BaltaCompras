package br.com.baltacompras.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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

import br.com.baltacompras.model.Cotacao;
import br.com.baltacompras.model.ProdutosAgrupados;
import br.com.baltacompras.repository.CotacaoCustomRepository;
import br.com.baltacompras.repository.CotacaoRepository;

@RestController
@RequestMapping("/cotacao")
public class CotacaoController {
    @Autowired
    private CotacaoRepository repositorio;

    @Autowired
    private CotacaoCustomRepository customRepo;

    @GetMapping("/listar")
    public List<Cotacao> listar(){
        return repositorio.findAll();
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
    
    @PostMapping
    public void salvar(@RequestBody Cotacao cotacao){
        repositorio.save(cotacao);
    }

    @PutMapping
    public void alterar(@RequestBody Cotacao cotacao){
        if(cotacao.getId()>0){
            repositorio.save(cotacao);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Cotacao cotacao){
        repositorio.delete(cotacao);
    }

    @PostMapping("/email")
    public void enviarEmail(@RequestParam(value = "id", required = false) Integer id){

    }

    //@GetMapping("/gerarCotacoes")
    
}
