package com.backend.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backend.dto.MedicoDTO;
import com.backend.exception.ModeloNotFoundException;
import com.backend.model.Medico;
import com.backend.service.IMedicoService;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

	@Autowired
	private IMedicoService service;
	
	@Autowired
	private ModelMapper mapper;
	
	@GetMapping
	//@RequestMapping(value = "/" , method = RequestMethod.GET)
	//@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')") //generamos una restriccionde rol de administrador o de usuario
	@PreAuthorize("@authServiceImpl.tieneAcceso('listar')") //llamamos al metodo en la clase AuthServiceImpl para validar accesos de rol
	public ResponseEntity<List<MedicoDTO>> listar() throws Exception {
		List<MedicoDTO> lista = service.listar().stream().map(p -> mapper.map(p, MedicoDTO.class)).collect(Collectors.toList());
		
		return new ResponseEntity<>(lista, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<MedicoDTO> listarPorId(@PathVariable("id") Integer id) throws Exception {
		Medico obj = service.listarPorId(id);
		
		if(obj == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
						
		MedicoDTO dto = mapper.map(obj, MedicoDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	/*@PostMapping
	public ResponseEntity<Medico> registrar(@RequestBody Medico p) throws Exception {
		Medico obj = service.registrar(p);
		return new ResponseEntity<>(obj, HttpStatus.CREATED);
	}*/
	
	@PostMapping
	public ResponseEntity<Void> registrar(@Valid @RequestBody MedicoDTO dto) throws Exception {
		Medico p = mapper.map(dto, Medico.class);
		Medico obj = service.registrar(p);
		
		//localhost:8080/medicos/5
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getIdMedico()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@PutMapping
	public ResponseEntity<MedicoDTO> modificar(@Valid @RequestBody MedicoDTO dto) throws Exception {
		Medico obj = service.listarPorId(dto.getIdMedico());
		
		if(obj == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + dto.getIdMedico());
		}
		
		Medico p = mapper.map(dto, Medico.class);		
		Medico pac = service.modificar(p);
		MedicoDTO dtoResponse = mapper.map(pac, MedicoDTO.class);
		return new ResponseEntity<>(dtoResponse, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable("id") Integer id) throws Exception {
		Medico obj = service.listarPorId(id);
		
		if(obj == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		service.eliminar(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/hateoas/{id}")
	public EntityModel<MedicoDTO> listarHateoas(@PathVariable("id") Integer id) throws Exception {
		Medico obj = service.listarPorId(id);
		
		if(obj == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
						
		MedicoDTO dto = mapper.map(obj, MedicoDTO.class);
		EntityModel<MedicoDTO> recurso= EntityModel.of(dto);
		
		WebMvcLinkBuilder link1 = linkTo(methodOn(this.getClass()).listarPorId(id));
		recurso.add(link1.withRel("medico-info"));
	
		return recurso;
		
	}


}
