package com.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.backend.dto.ConsultaResumenDTO;
import com.backend.model.Consulta;
import com.backend.model.Examen;

public interface IConsultaService extends ICRUD<Consulta, Integer> {
	
	Consulta registrarTransaccional(Consulta consulta, List<Examen> examenes) throws Exception;
	
	List<Consulta> buscar(String dni, String nombreCompleto);
	List<Consulta> buscarFecha(LocalDateTime fecha1, LocalDateTime fecha2);
	List<ConsultaResumenDTO> listarResumen();
	
	byte[] generarReporte(); //generamos el metodo para generar los reportes junto con los arreglos de bytes
	
		
}
