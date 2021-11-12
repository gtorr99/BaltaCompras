package br.com.baltacompras.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.baltacompras.model.Requisicao;
import br.com.baltacompras.repository.RequisicaoCustomRepository;
import br.com.baltacompras.repository.RequisicaoRepository;
import br.com.baltacompras.serviceimplement.Email;

@RestController
@RequestMapping("/requisicao")
public class RequisicaoController {
    @Autowired
    private RequisicaoRepository repositorio;

    @Autowired 
    private RequisicaoCustomRepository customRepo;

    @Autowired
    private Email email;

    @GetMapping("/findall")
    public ResponseEntity<?> listar(Pageable pageable) {
        return new ResponseEntity<>(repositorio.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/findbyid")
    public Optional<Requisicao> buscarPorId(@RequestParam("id") Integer id) {
        return repositorio.findById(id);
    }

    @GetMapping("/filterbydate")
    public List<Requisicao> buscarPorData(@RequestParam("datestart") String dataInicio, @RequestParam("dateend") String dataFim) throws ParseException{
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        Date dateIni = format.parse(dataInicio);
        Date dateFim = format.parse(dataFim);
        return customRepo.filtrarPorData(dateIni, dateFim);
    }

    @GetMapping("/filtrar")
    public List<Requisicao> filtrar(
    @RequestParam(value = "id", required  = false) Integer id,
    @RequestParam(value = "dataInicio", required = false) String dataInicio, 
    @RequestParam(value = "dataFim", required = false) String dataFim,
    @RequestParam(value = "status", required = false) Integer status, 
    @RequestParam(value = "observacao", required = false) String observacao) throws ParseException{
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        Date dateIni = null;
        Date dateFim = null;
        
        if(dataInicio != null){
            dateIni = format.parse(dataInicio);
        }
        if(dataFim != null){
            dateFim = format.parse(dataFim);
        }
        
        return customRepo.filtrar(id, dateIni, dateFim, status, observacao);        
    }

    @PostMapping
    public void salvar(@RequestBody Requisicao requisicao) {
        repositorio.save(requisicao);
    }

    @PutMapping
    public void alterar(@RequestBody Requisicao requisicao) {
        if (requisicao.getId() > 0) {
            repositorio.save(requisicao);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Requisicao requisicao) {
        repositorio.delete(requisicao);
    }
    
    
    @PostMapping("/email")
    public void gerarRelatorio(@RequestParam(value = "link") String link, @RequestParam(value = "destinatarios") String[] destinatarios) throws Exception{
        String mensagem = "<h4>Uma nova requisição está aguardando sua análise!</h4><br><a href=" + link + ">Clique aqui para acessar!</a>";
        String assunto = "Nova Requisição para análise";
        String arquivo = null;
        email.sendEmailWithAttachment(destinatarios, assunto, mensagem, arquivo);
    }
}
