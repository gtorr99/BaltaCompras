package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.baltacompras.model.Requisicao;

public interface RequisicaoRepository extends JpaRepository<Requisicao, Integer>{
    
}
