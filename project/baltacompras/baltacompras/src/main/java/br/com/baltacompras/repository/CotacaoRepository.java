package br.com.baltacompras.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.Cotacao;
import br.com.baltacompras.model.ProdutosAgrupados;

@Repository
public interface CotacaoRepository extends JpaRepository<Cotacao, Integer>{
    @Query(value = "select p.id_grupo_produto, rp.id_produto, sum(rp.quantidade) as quantidadeTotal " + 
    "from requisicao r " + 
   "join requisicao_produto rp on r.id = rp.id_requisicao " +
   "join produto p on p.id = rp.id_produto " + 
   "where r.status = 1 " + 
   "group by p.id_grupo_produto, rp.id_produto", nativeQuery = true)
   public List<ProdutosAgrupados> getRequisicoesAgrupadas();
}
