package br.com.baltacompras.service;

import java.io.BufferedWriter;
import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.baltacompras.model.Cotacao;
import br.com.baltacompras.repository.CotacaoRepository;
import br.com.baltacompras.repository.GrupoCotacaoProdutoRepository;
import br.com.baltacompras.repository.GrupoCotacaoRepository;

@Service
public class CotacaoService {
    @Autowired
    CotacaoRepository cotacaoRepository;

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

    public File gerarRelatorio() throws Exception{
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime now = LocalDateTime.now();
        File relatorio = new File("c:\\tmp\\REL_COTACAO_" + dtf.format(now) + ".CSV");
        BufferedWriter bw = Arquivo.getWriter(relatorio);
        List<Cotacao> cotacoes = cotacaoRepository.findAll();
        String header = "id;frete" + Arquivo.QUEBRA_LINHA;
        bw.write(header);
        for(Cotacao cotacao : cotacoes){
            String texto = cotacao.getId() + ";" + cotacao.getFrete();
            bw.write(texto + Arquivo.QUEBRA_LINHA);
        }
        bw.close();
        return relatorio;
    }
}
