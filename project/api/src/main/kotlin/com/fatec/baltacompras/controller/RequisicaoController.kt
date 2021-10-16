package com.fatec.baltacompras.controller

import com.fatec.baltacompras.model.Requisicao
import com.fatec.baltacompras.business.RequisicaoBusiness
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class RequisicaoController {

    @Autowired
    private lateinit var business: RequisicaoBusiness

    @GetMapping("/requisicao")
    fun getAll(): MutableList<Requisicao> {
        return business.get()
    }

    @PostMapping("/requisicao/{status}")
    fun updateStatus(@PathVariable status: String): Requisicao {
        return business.updateStatus(status)
    }
}