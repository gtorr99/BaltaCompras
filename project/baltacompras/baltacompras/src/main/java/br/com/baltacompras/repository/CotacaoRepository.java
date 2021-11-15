package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.Cotacao;


@Repository
public interface CotacaoRepository extends JpaRepository<Cotacao, Integer>, JpaSpecificationExecutor<Cotacao> {}
