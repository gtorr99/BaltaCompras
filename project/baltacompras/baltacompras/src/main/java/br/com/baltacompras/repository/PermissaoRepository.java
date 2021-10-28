package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.Permissao;

@Repository
public interface PermissaoRepository extends JpaRepository<Permissao, Integer>{
    
}
