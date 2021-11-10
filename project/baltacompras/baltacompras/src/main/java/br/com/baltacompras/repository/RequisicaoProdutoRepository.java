package br.com.baltacompras.repository;

import br.com.baltacompras.model.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.baltacompras.model.RequisicaoProduto;

import java.util.List;

public interface RequisicaoProdutoRepository extends JpaRepository<RequisicaoProduto, Integer>{
    List<RequisicaoProduto> findAllByRequisicaoStatus(Status status);
}
