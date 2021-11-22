package br.com.baltacompras.service;

import java.util.List;

import br.com.baltacompras.model.Usuario;
import org.springframework.stereotype.Service;
import br.com.baltacompras.model.GrupoCotacao;

@Service
public interface GrupoCotacaoService {
    List<GrupoCotacao> gerarCotacoes(Usuario usuario);
}
