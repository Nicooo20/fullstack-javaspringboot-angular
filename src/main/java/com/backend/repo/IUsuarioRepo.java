package com.backend.repo;

import com.backend.model.Usuario;

public interface IUsuarioRepo extends IGenericRepo<Usuario, Integer>  {

	//from usuario where username = ?
	//@Query("FROM Usuario us where us.username = ?")
	
	
	//Derived Query ->es lo mismo que el @Query("FROM Usuario us where us.username = ?")
	Usuario findOneByUsername(String username);	//findOne palabra reservada para llamar al metodo para buscar por usuario
}

