package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.baltacompras.model.FormaPagamento;

public interface FormaPagamentoRepository extends JpaRepository<FormaPagamento, Integer>{
    
}
