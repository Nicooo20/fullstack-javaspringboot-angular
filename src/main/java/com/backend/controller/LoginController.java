package com.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.model.ResetToken;
import com.backend.model.Usuario;
import com.backend.service.ILoginService;
import com.backend.service.IResetTokenService;
import com.backend.util.EmailUtil;
import com.backend.util.Mail;



@RestController
@RequestMapping("/login")
public class LoginController {
	
	@Autowired
	private ILoginService service;
	
	@Autowired	
	private IResetTokenService tokenService;
	
	@Autowired
	private EmailUtil emailUtil;
	
	//[mitotest21@gmail.com]
		@GetMapping(value = "/enviarCorreo")
		public ResponseEntity<Integer> enviarCorreo(@RequestParam("correo") String correo) throws Exception {
			int rpta = 0;
			
			Usuario us = service.verificarNombreUsuario(correo); //verificamos si el correo que envio el usuario existe en la base de datos
			if(us != null && us.getIdUsuario() > 0) { //si existe el usuario...
				ResetToken token = new ResetToken(); //llamamos el modelo ResetToken para generar una nuevo token aleatorio (linea 43)
				token.setToken(UUID.randomUUID().toString());
				token.setUser(us);
				token.setExpiracion(10);
				tokenService.guardar(token);
				
				Mail mail = new Mail();
				mail.setFrom("restablecer.pass.mediapp@gmail.com");
				mail.setTo(us.getUsername()); //para el usuario que necesita su nueva pass
				mail.setSubject("RESTABLECER CONTRASEÑA  MEDIAPP");
				
				Map<String, Object> model = new HashMap<>();
				String url = "http://localhost:4200/#/recuperar/" + token.getToken();
				model.put("user", token.getUser().getUsername());
				model.put("resetUrl", url);
				mail.setModel(model);
				
				emailUtil.enviarMail(mail);
				
				rpta = 1;			
			}
			return new ResponseEntity<Integer>(rpta, HttpStatus.OK);
		}
		
		@GetMapping(value = "/restablecer/verificar/{token}")
		public ResponseEntity<Integer> verificarToken(@PathVariable("token") String token) {
			int rpta = 0;
			try {
				if (token != null && !token.isEmpty()) {
					ResetToken rt = tokenService.findByToken(token); //vamos a la base de datos y buscamos el token
					if (rt != null && rt.getId() > 0) {
						if (!rt.estaExpirado()) { //verificamos si el token no esta expirado
							rpta = 1;
						}
					}
				}
			} catch (Exception e) {
				return new ResponseEntity<Integer>(rpta, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return new ResponseEntity<Integer>(rpta, HttpStatus.OK);
		}
		
		@PostMapping(value = "/restablecer/{token}", produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<Object> restablecerClave(@PathVariable("token") String token, @RequestBody String clave) {		
			try {
				ResetToken rt = tokenService.findByToken(token);			
				service.cambiarClave(clave, rt.getUser().getUsername());
				tokenService.eliminar(rt);
			} catch (Exception e) {
				return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return new ResponseEntity<Object>(HttpStatus.OK);
		}
	
	
	
	
	
}
