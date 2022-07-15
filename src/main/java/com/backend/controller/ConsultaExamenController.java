package com.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.ConsultaExamenDTO;
import com.backend.model.ConsultaExamen;
import com.backend.service.IConsultaExamenService;


@RestController
@RequestMapping("/consultaexamenes")
public class ConsultaExamenController {
	
	@Autowired (required=true)
	private ModelMapper mapper;
	
	@Autowired (required=true)
	private IConsultaExamenService service;
	
	@GetMapping(value = "/{idConsulta}")
	public ResponseEntity<List<ConsultaExamenDTO>> listar(@PathVariable("idConsulta") Integer idconsulta) {
		List<ConsultaExamen> consultasexamen = new ArrayList<>();
		consultasexamen = service.listarExamenesPorConsulta(idconsulta);
		
		List<ConsultaExamenDTO> ceDTO = mapper.map(consultasexamen, new TypeToken<List<ConsultaExamenDTO>>() {}.getType());
		return new ResponseEntity<>(ceDTO, HttpStatus.OK);	
	}
	
}
