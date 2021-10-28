package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.baltacompras.model.GrupoCotacao;

public interface GrupoCotacaoRepository extends JpaRepository<GrupoCotacao, Integer>{
    
}
