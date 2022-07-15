package com.backend.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

public class ConsultaListaExamenDTO {

	@NotNull
	private ConsultaDTO consulta;

	@NotNull
	private List<ExamenDTO> lstExamen;

	public ConsultaDTO getConsulta() {
		return consulta;
	}

	public void setConsulta(ConsultaDTO consulta) {
		this.consulta = consulta;
	}

	public List<ExamenDTO> getLstExamen() {
		return lstExamen;
	}

	public void setLstExamen(List<ExamenDTO> lstExamen) {
		this.lstExamen = lstExamen;
	}

}


//con esta implementacion obtenemos el DTO de las consultas y los examenes , con el fin de agruparlas
