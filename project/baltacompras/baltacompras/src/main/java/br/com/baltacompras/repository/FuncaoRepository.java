package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.Funcao;

@Repository
public interface FuncaoRepository extends JpaRepository<Funcao, Integer>{
    
}
