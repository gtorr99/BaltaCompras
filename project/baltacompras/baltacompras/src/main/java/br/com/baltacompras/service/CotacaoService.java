package br.com.baltacompras.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.baltacompras.model.GrupoCotacao;
import br.com.baltacompras.model.GrupoCotacaoProduto;
import br.com.baltacompras.model.ProdutosAgrupados;
import br.com.baltacompras.repository.CotacaoRepository;
import br.com.baltacompras.repository.GrupoCotacaoProdutoRepository;
import br.com.baltacompras.repository.GrupoCotacaoRepository;

@Service
public class CotacaoService {
    @Autowired
    CotacaoRepository repository;

    @Autowired
    GrupoCotacaoRepository grupoCotacaoRepository;

    @Autowired
    GrupoCotacaoProdutoRepository grupoCotacaoProdutoRepository;

    // public List<GrupoCotacao> gerarCotacoes() {
    //     List<ProdutosAgrupados> produtosAgrupados = repository.getRequisicoesAgrupadas();

    //     Set<Integer> grupoProdutoIds = new HashSet<Integer>();
    //     produtosAgrupados.forEach(p -> grupoProdutoIds.add(p.getId_grupo_produto()));

    //     Map<Integer, GrupoCotacao> grupoCotacaoMap = new HashMap<Integer, GrupoCotacao>();
    //     List<GrupoCotacaoProduto> grupoCotacaoProdutoList = new List<GrupoCotacaoProduto>();

    //     grupoProdutoIds.forEach(gp -> grupoCotacaoMap.put(gp, grupoCotacaoRepository.save(new GrupoCotacao())));

    //     produtosAgrupados.forEach(p -> grupoCotacaoProdutoList.add(
    //         grupoCotacaoProdutoRepository.save(new GrupoCotacaoProduto(
    //             grupoCotacaoMap,
    //             p.getQuantidadeTotal(),

    //     ))));

    // }
}
