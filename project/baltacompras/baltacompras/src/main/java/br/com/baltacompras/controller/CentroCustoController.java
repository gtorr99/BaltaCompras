package br.com.baltacompras.controller;

import java.util.List;

import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.JoinFetch;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.CentroCusto;
import br.com.baltacompras.repository.CentroCustoRepository;

@RestController
@RequestMapping("/centro-custo")
public class CentroCustoController {

    @Join(path = "setor", alias = "s")
    @Spec(path = "s.id", params = "setorId", spec = Equal.class)
    interface ModelSpec extends Specification<CentroCusto> {
    }

    @Autowired
    private CentroCustoRepository repositorio;

    @GetMapping("/listar")
    public List<CentroCusto> listar(ModelSpec spec) {
        return repositorio.findAll(spec);
    }

    @Transactional
    @PostMapping("/salvar")
    public void salvar(@RequestBody CentroCusto centroCusto) {
        repositorio.save(centroCusto);
    }

    @Transactional
    @PutMapping("/alterar")
    public void alterar(@RequestBody CentroCusto centroCusto) {
        if (centroCusto.getId() > 0) {
            repositorio.save(centroCusto);
        }
    }

    @Transactional
    @DeleteMapping("/excluir/{id}")
    public void excluir(@RequestBody CentroCusto centroCusto) {
        repositorio.delete(centroCusto);
    }
}
