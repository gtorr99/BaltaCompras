package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.Requisicao;

@Repository
public interface RequisicaoRepository extends JpaRepository<Requisicao, Integer>{

}

