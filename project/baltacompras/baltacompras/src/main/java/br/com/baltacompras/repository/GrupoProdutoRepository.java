package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.GrupoProduto;

@Repository
public interface GrupoProdutoRepository extends JpaRepository<GrupoProduto, Integer>{
    
}
