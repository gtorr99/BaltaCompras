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

import br.com.baltacompras.model.OrdemCompra;
import br.com.baltacompras.repository.OrdemCompraCustomRepository;
import br.com.baltacompras.repository.OrdemCompraRepository;

@RestController
@RequestMapping("/ordemcompra")
public class OrdemCompraController {
    @Autowired
    private OrdemCompraRepository repositorio;

    @Autowired
    private OrdemCompraCustomRepository customRepo;

    @GetMapping("/listar")
    public List<OrdemCompra> listar() {
        return repositorio.findAll();
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

    @PostMapping
    public void salvar(@RequestBody OrdemCompra ordemCompra) {
        repositorio.save(ordemCompra);
    }

    @PutMapping
    public void alterar(@RequestBody OrdemCompra ordemCompra) {
        if (ordemCompra.getId() > 0) {
            repositorio.save(ordemCompra);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody OrdemCompra ordemCompra) {
        repositorio.delete(ordemCompra);
    }
}
