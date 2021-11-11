package br.com.baltacompras.controller;

import net.kaczmarzyk.spring.data.jpa.domain.NotEqual;
import org.springframework.data.jpa.domain.Specification;

import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

@Spec(path = "status", constVal = "DELETADO", spec = NotEqual.class)
public interface NotDeletedEntity<T> extends Specification<T> {}
