package br.com.baltacompras.controller;

import java.sql.Array;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import br.com.baltacompras.model.enums.Status;
import br.com.baltacompras.serviceimplement.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.OrdemCompra;
import br.com.baltacompras.repository.OrdemCompraCustomRepository;
import br.com.baltacompras.repository.OrdemCompraRepository;

@RestController
@RequestMapping("/ordem-compra")
public class OrdemCompraController {
    @Autowired
    private OrdemCompraRepository repositorio;

    @Autowired
    private OrdemCompraCustomRepository customRepo;

    @Autowired
    private Email email;

    @GetMapping("/listar")
    public List<OrdemCompra> listar() {
        return repositorio.findAll();
    }

     @GetMapping("/listar-paginado")
    public Page<OrdemCompra> listarPaginado(Pageable page) {
        return repositorio.findAll(page);
    }

    @PostMapping("/salvar")
    public void salvar(@RequestBody OrdemCompra ordemCompra){
        ordemCompra.setStatus(Status.ABERTO);
        OrdemCompra oc = repositorio.save(ordemCompra);
    }

    @GetMapping("/filtrar")
    public List<OrdemCompra> filtrar(
            @RequestParam(value = "id", required = false) Integer id,
            @RequestParam(value = "dataInicio", required = false) String dataInicio,
            @RequestParam(value = "dataFim", required = false) String dataFim,
            @RequestParam(value = "tipoCompra", required = false) Integer tipoCompra,
            @RequestParam(value = "status", required = false) Integer status,
            @RequestParam(value = "observacoes", required = false) String observacoes) throws ParseException {
                
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        Date dateInicio = null;
        Date dateFim = null;
        if (dataInicio != null) {
            dateInicio = format.parse(dataInicio);
        }
        if (dataFim != null) {
            dateFim = format.parse(dataFim);
        }

        return customRepo.filtrar(id, dateInicio, dateFim, tipoCompra, status, observacoes);
    }

    @PutMapping("/cancelar/{id}")
    public Boolean cancelar(@PathVariable Integer id) {
        OrdemCompra ordemCompra = repositorio.getById(id);
        if (ordemCompra.getId() > 0 && ordemCompra.getStatus() == Status.ABERTO) {
            ordemCompra.setStatus(Status.CANCELADO);
            repositorio.save(ordemCompra);
            return true;
        }
        return false;
    }

    @PutMapping("/aprovar/{id}")
    public void aprovar(@PathVariable Integer id) throws Exception {
        OrdemCompra ordemCompra = repositorio.getById(id);
        ordemCompra.setStatus(Status.APROVADO);
        ordemCompra.getCotacao().getGrupoCotacao().setStatus(Status.CONCLUIDO);
        repositorio.save(ordemCompra);
        String[] destinatarios = { "gabriel.guimaraes6@fatec.sp.gov.br" };
        emailFornecedor(destinatarios, id);
    }

    @PutMapping("/reprovar/{id}")
    public void reprovar(@PathVariable Integer id) {
        OrdemCompra ordemCompra = repositorio.getById(id);
        ordemCompra.setStatus(Status.REPROVADO);
        ordemCompra.getCotacao().getGrupoCotacao().setStatus(Status.REPROVADO);
        repositorio.save(ordemCompra);
    }

    public void emailFornecedor(String[] destinatarios, Integer id) throws Exception{
        String mensagem = "<h4>Ordem de compra - " + id + " aprovada!</h4>";
        String assunto = "Ordem de compra aprovada";
        String arquivo = null;
        email.sendEmailWithAttachment(destinatarios, assunto, mensagem, arquivo);
    }
}
