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

    public List<Requisicao> filtrar(Integer id, Date dataInicio, Date dataFim, Integer status, String observacao){
        
        String query = "select r from Requisicao as r where ";
        String condicao = "";

        if(id != null){
            query += condicao + "id = :id";
            condicao = " and ";
        }

        if(status != null){
            query += condicao + "status = :status";
            condicao = " and ";
        }

        if(observacao != null){
            query += condicao + "observacoes like :observacao";
            condicao = " and ";
        }

        if(dataInicio != null && dataFim != null){
            query += condicao + "data between :dataInicio and :dataFim";
            condicao = " and ";
        } else if(dataInicio != null){
            query += condicao + "data >= :dataInicio";
        } else if(dataFim != null){
            query += condicao + "data <= :dataFim";
        }
        var q = em.createQuery(query, Requisicao.class);
        
        
        if(id != null){
           q.setParameter("id", id);
        }

        if(status != null){
            q.setParameter("status", status);
        }

        if(observacao != null){
            q.setParameter("observacao", "%" + observacao + "%");
        }

        if(dataInicio != null && dataFim != null){
            q.setParameter("dataInicio", dataInicio);
            q.setParameter("dataFim", dataFim);
        } else if(dataInicio != null){
            q.setParameter("dataInicio", dataInicio);
        } else if(dataFim != null){
            q.setParameter("dataFim", dataFim);
        }

        return q.getResultList();
    }


}
