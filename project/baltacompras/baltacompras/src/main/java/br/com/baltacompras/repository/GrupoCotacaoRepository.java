package br.com.baltacompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.baltacompras.model.GrupoCotacao;
import br.com.baltacompras.model.ProdutoAgrupado;

import java.util.List;

public interface GrupoCotacaoRepository extends JpaRepository<GrupoCotacao, Integer>{
        @Query("select new br.com.baltacompras.model.ProdutoAgrupado(p.grupoProduto.id, rp.produto.id, CAST(sum(rp.quantidade) as float)) " +
            "from Requisicao r " +
            "join RequisicaoProduto rp on r.id = rp.requisicao.id " +
            "join Produto p on p.id = rp.produto.id " +
            "where r.status = 1 " +
            "group by p.grupoProduto.id, rp.produto.id")
    public List<ProdutoAgrupado> getRequisicoesAgrupadas();
}
