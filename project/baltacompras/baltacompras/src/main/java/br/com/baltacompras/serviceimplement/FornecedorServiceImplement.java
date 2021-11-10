package br.com.baltacompras.serviceimplement;

import br.com.baltacompras.service.FornecedorService;

public class FornecedorServiceImplement implements FornecedorService  {

    @Override
    public boolean validarCnpj(String cnpj) {
        
        return cnpj.matches("\\d{14}");

    }

    @Override
    public boolean validarUf(String uf) {
        
        return uf.matches("[A-Z]{2}");

    }

    
}
