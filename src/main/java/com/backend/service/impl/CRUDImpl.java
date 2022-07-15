package com.backend.service.impl;

import java.util.List;

import com.backend.repo.IGenericRepo;
import com.backend.service.ICRUD;

public abstract class CRUDImpl<T, ID> implements ICRUD<T, ID>{

	protected abstract IGenericRepo<T, ID> getRepo();
	
	@Override
	public T registrar(T p) throws Exception {
		return getRepo().save(p);
	}

	@Override
	public T modificar(T p) throws Exception {
		return getRepo().save(p);
	}

	@Override
	public List<T> listar() throws Exception {
		return getRepo().findAll();
	}

	@Override
	public T listarPorId(ID id) throws Exception {
		return getRepo().findById(id).orElse(null);
	}

	@Override
	public void eliminar(ID id) throws Exception {
		getRepo().deleteById(id);
	}

}
