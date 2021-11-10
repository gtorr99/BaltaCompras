package br.com.baltacompras.repository;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.OrdemCompra;

@Repository
public class OrdemCompraCustomRepository {
    
    private final EntityManager em;

    public OrdemCompraCustomRepository(EntityManager em){
        this.em = em;
    }

    public List<OrdemCompra> filtrar(Integer id, Date dataInicio, Date dataFim, Integer tipoCompra, Integer status,
    String observacoes){

        String query = "select o from OrdemCompra as o";
        String condicao = " where ";

        if(id != null){
            query += condicao + "id = :id";
            condicao = " and ";
        }

        if(tipoCompra != null){
            query += condicao + "tipo_compra = :tipoCompra";
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

        if(dataInicio != null && dataFim != null){
            query += condicao + "data between :dataInicio and :dataFim";
        } else if(dataInicio != null){
            query += condicao + "data >= :dataInicio";
        } else if(dataFim != null){
            query += condicao + "data <= :dataFim";
        }

        var q = em.createQuery(query, OrdemCompra.class);

        if(id != null){
            q.setParameter("id", id);
        }

        if(tipoCompra != null){
            q.setParameter("tipoCompra", tipoCompra);
        }

        if(status != null){
            q.setParameter("status", status);
        }

        if(observacoes != null){
            q.setParameter("observacoes", "%" + observacoes + "%");
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
