package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tokens")
public class TokenController {
	
	@Autowired
	private ConsumerTokenServices tokenServices;
	
	@GetMapping("/anular/{tokenId:.*}") // .* para tomar todo el token y no solo la primera parte de el mismo
	public void revocarToken(@PathVariable("tokenId") String token) {
		tokenServices.revokeToken(token);
	}

}
