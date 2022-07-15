package com.backend.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class PacienteDTO {
	
	private Integer idPaciente;
	
	@NotNull
	@Size(min = 3, message = "{nombres.size}")
	//@JsonProperty(value="nombre_conalgo") //forma de llamar a traves de json los datos cuando son nombres mas complejos para utilizar en el front o back
	private String nombres;
	
	@NotNull
	@Size(min = 3, message= "{apellidos.size}")	
	private String apellidos;
	
	@NotNull
	@Size(min = 9)
	private String dni;
	
	@NotNull
	@Size(min = 3, max = 150)
	private String direccion;
		
	@NotEmpty
	@Email
	private String email;
	
	@Size(min = 11, max = 11)	
	//@Pattern(regexp = "")
	private String telefono;

	public Integer getIdPaciente() {
		return idPaciente;
	}

	public void setIdPaciente(Integer idPaciente) {
		this.idPaciente = idPaciente;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	

}
