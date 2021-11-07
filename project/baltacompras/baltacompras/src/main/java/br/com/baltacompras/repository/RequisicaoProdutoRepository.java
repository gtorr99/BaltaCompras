package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.baltacompras.model.RequisicaoProduto;

import java.util.List;

public interface RequisicaoProdutoRepository extends JpaRepository<RequisicaoProduto, Integer>{
    List<RequisicaoProduto> findAllByRequisicaoStatus(Integer status);
}
