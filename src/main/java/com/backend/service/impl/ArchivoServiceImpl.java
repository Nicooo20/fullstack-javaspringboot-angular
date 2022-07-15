package com.backend.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.model.Archivo;
import com.backend.repo.IArchivoRepo;
import com.backend.service.IArchivoService;


@Service
public class ArchivoServiceImpl implements IArchivoService {
	@Autowired
	private IArchivoRepo repo;
	
	@Override
	public int guardar(Archivo archivo) {
		Archivo ar = repo.save(archivo); //vamos a la capa de repo para guardar el archivo
		return ar.getIdArchivo() >0 ? 1 :0; //si guarda bien es 1 si no un 0
	}
	@Override
	public byte[] leerArchivo(Integer idArchivo) {
		Optional<Archivo> op = repo.findById(idArchivo); //buscamos el archivo por id
		return op.isPresent() ? op.get().getValue() : new byte[0]; //obtenemos el valor del archivo sino le mandamos un byte vacio 
	}

}
