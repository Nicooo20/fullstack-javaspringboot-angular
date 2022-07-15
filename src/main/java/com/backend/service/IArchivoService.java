package com.backend.service;

import org.springframework.stereotype.Service;

import com.backend.model.Archivo;

@Service
public interface IArchivoService {
	int guardar(Archivo archivo);
	byte[] leerArchivo(Integer idArchivo);
}
