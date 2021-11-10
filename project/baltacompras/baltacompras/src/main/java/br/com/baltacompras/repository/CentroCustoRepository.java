package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.CentroCusto;

@Repository
public interface CentroCustoRepository extends JpaRepository<CentroCusto, Integer>{
    
}
