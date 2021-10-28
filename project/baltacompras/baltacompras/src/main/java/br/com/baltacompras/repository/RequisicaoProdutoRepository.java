package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.baltacompras.model.RequisicaoProduto;

public interface RequisicaoProdutoRepository extends JpaRepository<RequisicaoProduto, Integer>{
    
}
