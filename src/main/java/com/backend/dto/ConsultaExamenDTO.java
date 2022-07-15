package com.backend.dto;

public class ConsultaExamenDTO {
	
	private ConsultaDTO consulta;
	private ExamenDTO examen;
	
	public ConsultaDTO getConsulta() {
		return consulta;
	}
	public void setConsulta(ConsultaDTO consulta) {
		this.consulta = consulta;
	}
	public ExamenDTO getExamen() {
		return examen;
	}
	public void setExamen(ExamenDTO examen) {
		this.examen = examen;
	}

}
