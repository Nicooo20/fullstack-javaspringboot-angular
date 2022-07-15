package com.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.MenuDTO;
import com.backend.model.Menu;
import com.backend.service.IMenuService;

@RestController
@RequestMapping("/menus")
public class MenuController {
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private IMenuService service;
	
	@GetMapping
	public ResponseEntity<List<MenuDTO>> listar() throws Exception{
		List<Menu> menus = new ArrayList<>();
		menus = service.listar();
		List<MenuDTO> menusDTO = modelMapper.map(menus, new TypeToken<List<MenuDTO>>() {}.getType());
		return new ResponseEntity<>(menusDTO, HttpStatus.OK);
	}
	
	@PostMapping("/usuario")
	public ResponseEntity<List<MenuDTO>> listar(@RequestBody String nombre) throws Exception{ //listar(@RequestBody String nombre forma para obtener el nombre desde el front-end(no recomendada)
		List<Menu> menus = new ArrayList<>();
		//Authentication usuarioLogueado = SecurityContextHolder.getContext().getAuthentication(); //formar para obtener el nombre por el backend (recomendada)
		//menus = service.listarMenuPorUsuario(usuarioLogueado.getName());
		menus = service.listarMenuPorUsuario(nombre);
		List<MenuDTO> menusDTO = modelMapper.map(menus, new TypeToken<List<MenuDTO>>() {}.getType());
		return new ResponseEntity<>(menusDTO, HttpStatus.OK);
	}

}
