package br.com.baltacompras.service;

import java.util.List;

import org.springframework.stereotype.Service;
import br.com.baltacompras.model.GrupoCotacao;

@Service
public interface GrupoCotacaoService {
    List<GrupoCotacao> gerarCotacoes();
}
