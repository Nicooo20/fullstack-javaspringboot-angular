package com.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "rol")
public class Rol {

	@Id
	private Integer idRol;

	@Column(name = "nombre", nullable = false, length = 15)
	private String nombre;

	@Column(name = "descripcion", nullable = true, length = 150)
	private String descricpion;

	public Integer getIdRol() {
		return idRol;
	}

	public void setIdRol(Integer idRol) {
		this.idRol = idRol;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescricpion() {
		return descricpion;
	}

	public void setDescricpion(String descricpion) {
		this.descricpion = descricpion;
	}

}
