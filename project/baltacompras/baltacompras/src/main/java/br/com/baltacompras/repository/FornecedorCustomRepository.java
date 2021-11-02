package br.com.baltacompras.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import br.com.baltacompras.model.Fornecedor;

@Repository
public class FornecedorCustomRepository {

    private EntityManager em;

    public FornecedorCustomRepository(EntityManager em) {
        this.em = em;
    }

    public List<Fornecedor> filtrar(Integer id, String cnpj, String inscricaoEstadual, String razaoSocial,
            String nomeFantasia, String status, String email, String telefone, String cep, String rua, String numero,
            String complemento, String bairro, String cidade, String estado) {

        String query = "select f from Fornecedor as f";
        String condicao = " where ";

        if (id != null) {
            query += condicao + "id = :id";
            condicao = " and ";
        }

        if (cnpj != null) {
            query += condicao + "cnpj = :cnpj";
            condicao = " and ";
        }

        if(inscricaoEstadual != null){
            query += condicao + "inscricao_estadual = :inscricaoEstadual";
            condicao = " and ";
        }

        if(razaoSocial != null){
            query += condicao + "razao_social like :razaoSocial";
            condicao = " and ";
        }

        if(nomeFantasia != null){
            query += condicao + "nome_fantasia like :nomeFantasia";
            condicao = " and ";
        }

        if(status != null){
            query += condicao + "status = :status";
            condicao = " and ";
        }

        if(email != null){
            query += condicao + "email = :email";
            condicao = " and ";
        }

        if(telefone != null){
            query += condicao + "telefone = :telefone";
            condicao = " and ";
        }

        if(cep != null){
            query += condicao + "cep = :cep";
            condicao = " and ";
        }

        if(rua != null){
            query += condicao + "rua = :rua";
            condicao = " and ";
        }

        if(numero != null){
            query += condicao + "numero = :numero";
            condicao = " and ";
        }

        if(complemento != null){
            query += condicao + "complemento = :complemento";
            condicao = " and ";
        }

        if(bairro != null){
            query += condicao + "bairro = :bairro";
            condicao = " and ";
        }

        if(cidade != null){
            query += condicao + "cidade = :cidade";
            condicao = " and ";
        }

        if(estado != null){
            query += condicao + "estado = :estado";
        }

        var q = em.createQuery(query, Fornecedor.class);

        if (id != null) {
            q.setParameter("id", id);
        }

        if (cnpj != null) {
            q.setParameter("cnpj", cnpj);
        }

        if(inscricaoEstadual != null){
            q.setParameter("inscricaoEstadual", inscricaoEstadual);
        }

        if(razaoSocial != null){
            q.setParameter("razaoSocial", "%" + razaoSocial + "%");
        }

        if(nomeFantasia != null){
            q.setParameter("nomeFantasia", "%" + nomeFantasia + "%");
        }

        if(status != null){
            q.setParameter("status", status);
        }

        if(email != null){
            q.setParameter("email", email);
        }

        if(telefone != null){
            q.setParameter("telefone", telefone);
        }

        if(cep != null){
            q.setParameter("cep", cep);
        }

        if(rua != null){
            q.setParameter("rua", rua);
        }

        if(numero != null){
            q.setParameter("numero", numero);
        }

        if(complemento != null){
            q.setParameter("complemento", complemento);
        }

        if(bairro != null){
            q.setParameter("bairro", bairro);
        }

        if(cidade != null){
            q.setParameter("cidade", cidade);
        }

        if(estado != null){
            q.setParameter("estado", estado);
        }        

        return q.getResultList();
    }

}
