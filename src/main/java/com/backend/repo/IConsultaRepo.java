package com.backend.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.model.Consulta;

//@Repository
public interface IConsultaRepo extends IGenericRepo<Consulta, Integer>{
	
	//JPQL Java Persistence Query Lenguage
	//query para buscar por rut, nombre o apellidos
	@Query("FROM Consulta c WHERE c.paciente.dni = :dni OR LOWER(c.paciente.nombres) LIKE %:nombreCompleto%  OR LOWER(c.paciente.apellidos) LIKE %:nombreCompleto%" ) //Pasamos a minusculas con la palabra reservada con LOWER
	List<Consulta> buscar(@Param("dni") String dni, @Param("nombreCompleto")String nombreCompleto);
	
	//query para buscar por rango de fechas
	@Query("FROM Consulta c WHERE c.fecha BETWEEN :fechaConsulta1 AND :fechaConsulta2") //se tiene que agregar el plusDays donde llama al metodo ya que el Between no agrega el valor original ya que resta 1 dia
	List<Consulta> buscarFecha(@Param("fechaConsulta1") LocalDateTime fechaConsulta, @Param("fechaConsulta2") LocalDateTime fechaConsulta2);
	
	@Query(value = "select * from fn_listarResumen()", nativeQuery = true)
	List<Object[]> listarResumen();
}
