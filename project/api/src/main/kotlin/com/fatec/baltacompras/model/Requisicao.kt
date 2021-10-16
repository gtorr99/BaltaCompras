package com.fatec.baltacompras.model

import java.util.*

import com.fatec.baltacompras.util.enum.Status
import javax.persistence.*

@Entity
@Table(name = "requisicao")
class Requisicao (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "id_requisicao_seq")
    @Column(name = "id")
    var id: Int,

    var data: Date,
    var status: Status,

    @Column(columnDefinition = "text")
    var observacoes: String,
    var idUsuario: Int,
    var idCentroCusto: Int
)