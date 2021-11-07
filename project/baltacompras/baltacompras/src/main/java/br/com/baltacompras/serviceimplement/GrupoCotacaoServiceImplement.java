package br.com.baltacompras.serviceimplement;

import br.com.baltacompras.model.*;
import br.com.baltacompras.model.enums.Status;
import br.com.baltacompras.repository.GrupoCotacaoProdutoRepository;
import br.com.baltacompras.repository.GrupoCotacaoRepository;

import java.util.*;

import br.com.baltacompras.repository.GrupoProdutoRepository;
import br.com.baltacompras.repository.RequisicaoProdutoRepository;
import br.com.baltacompras.service.GrupoCotacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GrupoCotacaoServiceImplement implements GrupoCotacaoService {

    @Autowired
    GrupoCotacaoRepository repository;

    @Autowired
    GrupoCotacaoProdutoRepository grupoCotacaoProdutoRepository;

    @Autowired
    RequisicaoProdutoRepository requisicaoProdutoRepository;

    @Autowired
    GrupoProdutoRepository grupoProdutoRepository;

    @Override
    @Transactional
     public List<GrupoCotacao> gerarCotacoes() {
         List<ProdutoAgrupado> produtosAgrupados = repository.getRequisicoesAgrupadas();

         Map<GrupoProduto, Date> grupoProdutoEPrazoMap = new HashMap<>();
         produtosAgrupados.forEach(pa ->
             grupoProdutoEPrazoMap.put(grupoProdutoRepository.getById(pa.getId_grupo_produto()), pa.getPrazo())
         );

         Map<Integer, GrupoCotacao> grupoCotacaoMap = new HashMap<>();
         grupoProdutoEPrazoMap.forEach((gp, prazo) ->
                 grupoCotacaoMap.put(gp.getId(), repository.save(new GrupoCotacao(prazo, gp)
         )));

         List<RequisicaoProduto> requisicaoProdutos = requisicaoProdutoRepository.findAllByRequisicaoStatus(Status.APROVADO);

         produtosAgrupados.forEach(pa -> {
             GrupoCotacaoProduto gcp = grupoCotacaoProdutoRepository.save(new GrupoCotacaoProduto(
                 pa.getQuantidadeTotal(),
                 grupoCotacaoMap.get(pa.getId_grupo_produto())
             ));
             requisicaoProdutos.forEach(rp -> {
                 if (Objects.equals(rp.getProduto().getId(), pa.getId_produto())) {
                     rp.setGrupoCotacaoProduto(gcp);
                     rp.getRequisicao().setStatus(Status.EM_PROCESSAMENTO);
                     requisicaoProdutoRepository.save(rp);
                 }
             });
         });

         return new ArrayList<>(grupoCotacaoMap.values());
     }
}

