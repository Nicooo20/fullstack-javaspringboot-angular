package com.backend.util;

import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Component
public class EmailUtil {
	
	@Autowired
	private JavaMailSender emailSender;
	
	@Autowired
	private SpringTemplateEngine templateEngine;
	
	public void enviarMail(Mail mail) throws MessagingException {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name()); //configuraciones iniciales
		
		Context context = new Context(); //generamos un variable para darle un contexto
		context.setVariables(mail.getModel());//mandamos las variables que se necesitan para cambiar contraseña y obtener los datos del usuario
		
		String html = templateEngine.process("email/email-template", context); //buscamos donde esta la plantilla html a procesar
		helper.setTo(mail.getTo());
		helper.setText(html, true);
		helper.setSubject(mail.getSubject());
		helper.setFrom(mail.getFrom());
		helper.addAttachment("MyTestFile.txt", new ByteArrayResource("test".toString().getBytes()));
		
		emailSender.send(message); //mandamos el mensaje
	}

}
