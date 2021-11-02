package br.com.baltacompras.repository;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.Requisicao;

@Repository
public class RequisicaoCustomRepository {
    
    private final EntityManager em;

    public RequisicaoCustomRepository(EntityManager em){
        this.em = em;
    }

    public List<Requisicao> filtrarPorData(Date dataInicio, Date dataFim){
        
        String query = "select r from Requisicao as r where r.data between :dataInicio and :dataFim";
        var q = em.createQuery(query, Requisicao.class);
        q.setParameter("dataInicio", dataInicio);
        q.setParameter("dataFim", dataFim);
        
        return q.getResultList();
    }


}
