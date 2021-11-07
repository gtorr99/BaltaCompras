package br.com.baltacompras.serviceimplement;

import br.com.baltacompras.model.GrupoCotacao;
import br.com.baltacompras.model.GrupoCotacaoProduto;
import br.com.baltacompras.model.ProdutoAgrupado;
import br.com.baltacompras.model.RequisicaoProduto;
import br.com.baltacompras.repository.GrupoCotacaoProdutoRepository;
import br.com.baltacompras.repository.GrupoCotacaoRepository;

import java.util.*;

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

    @Override
    @Transactional
     public List<GrupoCotacao> gerarCotacoes() {
         List<ProdutoAgrupado> produtosAgrupados = repository.getRequisicoesAgrupadas();

         Set<Integer> grupoProdutoIds = new HashSet<>();
         produtosAgrupados.forEach(pa -> grupoProdutoIds.add(pa.getId_grupo_produto()));

         Map<Integer, GrupoCotacao> grupoCotacaoMap = new HashMap<>();
         grupoProdutoIds.forEach(gp -> grupoCotacaoMap.put(gp, repository.save(new GrupoCotacao())));

         List<RequisicaoProduto> requisicaoProdutos = requisicaoProdutoRepository.findAllByRequisicaoStatus(1);

         produtosAgrupados.forEach(pa -> {
             GrupoCotacaoProduto gcp = grupoCotacaoProdutoRepository.save(new GrupoCotacaoProduto(
                 pa.getQuantidadeTotal(),
                 grupoCotacaoMap.get(pa.getId_grupo_produto())
             ));
             requisicaoProdutos.forEach(rp -> {
                 if (Objects.equals(rp.getProduto().getId(), pa.getId_produto())) {
                     rp.setGrupoCotacaoProduto(gcp);
                     rp.getRequisicao().setStatus(3);
                     requisicaoProdutoRepository.save(rp);
                 }
             });
         });

         return new ArrayList<>(grupoCotacaoMap.values());
     }
}

