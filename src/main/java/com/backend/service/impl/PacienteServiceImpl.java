package com.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.backend.model.Paciente;
import com.backend.repo.IGenericRepo;
import com.backend.repo.IPacienteRepo;
import com.backend.service.IPacienteService;

@Service
public class PacienteServiceImpl extends CRUDImpl<Paciente, Integer> implements IPacienteService {
	
	@Autowired
	private IPacienteRepo repo;

	@Override
	protected IGenericRepo<Paciente, Integer> getRepo() {
		return repo;
	}

	@Override
	public Page<Paciente> listarPageable(Pageable page) {

		return repo.findAll(page);
	}



}
