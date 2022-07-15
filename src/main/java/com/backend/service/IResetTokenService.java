package com.backend.service;

import com.backend.model.ResetToken;

public interface IResetTokenService {
	
	ResetToken findByToken(String token);
	void guardar(ResetToken token);
	void eliminar(ResetToken token);

}
