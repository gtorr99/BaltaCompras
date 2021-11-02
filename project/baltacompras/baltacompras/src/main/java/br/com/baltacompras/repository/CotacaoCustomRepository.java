package br.com.baltacompras.repository;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.Cotacao;

@Repository
public class CotacaoCustomRepository {

    private EntityManager em;

    public CotacaoCustomRepository(EntityManager em) {
        this.em = em;
    }

    public List<Cotacao> filtrar(Integer id, Date prazoInicio, Date prazoFim, Integer selecionada,
            String transportadora, String meioTransporte, Integer status, String observacoes) {

        String query = "select c from Cotacao as c";
        String condicao = " where ";

        if(id != null){
            query += condicao + "id = :id";
            condicao = " and ";
        }

        if(selecionada != null){
            query += condicao + "selecionada = :selecionada";
            condicao = " and ";
        }

        if(transportadora != null){
            query += condicao + "transportadora like :transportadora";
            condicao = " and ";
        }

        if(meioTransporte != null){
            query += condicao + "meio_transporte like :meioTransporte";
            condicao = " and ";
        }

        if(status != null){
            query += condicao + "status = :status";
            condicao = " and ";
        }

        if(observacoes != null){
            query += condicao + "observacoes like :observacoes";
            condicao = " and ";
        }

        if(prazoInicio != null && prazoFim != null){
            query += condicao + "prazo between :prazoInicio and :prazoFim";
        } else if(prazoInicio != null){
            query += condicao + "prazo >= :prazoInicio";
        } else if(prazoFim != null){
            query += condicao + "prazo <= :prazoFim";
        }

        var q = em.createQuery(query, Cotacao.class);

        if(id != null){
            q.setParameter("id", id);
        }

        if(selecionada != null){
            q.setParameter("selecionada", selecionada);
        }

        if(transportadora != null){
            q.setParameter("transportadora", transportadora);
        }

        if(meioTransporte != null){
            q.setParameter("meioTransporte", meioTransporte);
        }

        if(status != null){
            q.setParameter("status", status);
        }

        if(observacoes != null){
            q.setParameter("observacoes", observacoes);
        }

        if(prazoInicio != null && prazoFim != null){
            q.setParameter("prazoInicio", prazoInicio);
            q.setParameter("prazoFim", prazoFim);
        } else if(prazoInicio != null){
            q.setParameter("prazoInicio", prazoInicio);
        } else if(prazoFim != null){
            q.setParameter("prazoFim", prazoFim);
        }
                
        return q.getResultList();
    }

}
