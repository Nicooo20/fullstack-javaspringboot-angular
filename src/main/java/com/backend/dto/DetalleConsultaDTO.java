package com.backend.dto;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class DetalleConsultaDTO {

	private Integer idDetalle;	
	
	@JsonIgnore
	private ConsultaDTO consulta;
	@NotNull
	private String diagnostico;
	@NotNull
	private String tratamiento;

	public Integer getIdDetalle() {
		return idDetalle;
	}

	public void setIdDetalle(Integer idDetalle) {
		this.idDetalle = idDetalle;
	}

	public ConsultaDTO getConsultaDTO() {
		return consulta;
	}

	public void setConsultaDTO(ConsultaDTO consulta) {
		this.consulta = consulta;
	}

	public String getDiagnostico() {
		return diagnostico;
	}

	public void setDiagnostico(String diagnostico) {
		this.diagnostico = diagnostico;
	}

	public String getTratamiento() {
		return tratamiento;
	}

	public void setTratamiento(String tratamiento) {
		this.tratamiento = tratamiento;
	}

}
