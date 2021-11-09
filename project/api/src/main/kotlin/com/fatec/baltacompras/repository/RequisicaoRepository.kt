package com.fatec.baltacompras.repository

import com.fatec.baltacompras.model.Requisicao
import org.springframework.data.jpa.repository.JpaRepository

interface RequisicaoRepository : JpaRepository<Requisicao, Int>