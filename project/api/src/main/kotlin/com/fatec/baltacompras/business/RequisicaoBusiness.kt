package com.fatec.baltacompras.business

import com.fatec.baltacompras.repository.RequisicaoRepository
import com.fatec.baltacompras.model.Requisicao
import com.fatec.baltacompras.util.enum.Status
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class RequisicaoBusiness {

    @Autowired
    private lateinit var repository: RequisicaoRepository

    fun get(): MutableList<Requisicao> = repository.findAll()

    fun updateStatus(status: String): Requisicao {
        val req = repository.getById(1)
        req.status = Status.valueOf(status.uppercase())
        return repository.save(req)
    }
}