package com.backend.service.impl;


import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dto.ConsultaResumenDTO;
import com.backend.model.Consulta;
import com.backend.model.Examen;
import com.backend.repo.IConsultaExamenRepo;
import com.backend.repo.IConsultaRepo;
import com.backend.repo.IGenericRepo;
import com.backend.service.IConsultaService;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ConsultaServiceImpl extends CRUDImpl<Consulta, Integer> implements IConsultaService {
	
	@Autowired
	private IConsultaRepo repo;
	
	@Autowired
	private IConsultaExamenRepo ceRepo;

	@Override
	protected IGenericRepo<Consulta, Integer> getRepo() {
		return repo;
	}

	@Transactional //Para el metodo donde va insertando distintos valores y uno de algunos de las sintaxis falla, este no afecte solo la tabla aparte de las otras que son utilizadas (si falla una insert , realiza un rollback)
	@Override
	public Consulta registrarTransaccional(Consulta consulta, List<Examen> examenes) throws Exception {
		consulta.getDetalleConsulta().forEach(det -> det.setConsulta(consulta));
		
		repo.save(consulta);	//primero se inserta la consulta sobre la IDENTIDAD , NO EN EL DTO
		
		examenes.forEach(e -> ceRepo.registrar(consulta.getIdConsulta(), e.getIdExamen())); //luego se inserta los examenes (no olvidar que son opcionales)
		
		return consulta;
		
	}
	
	@Override
	public List<Consulta> buscar(String dni, String nombreCompleto){
		return repo.buscar(dni, nombreCompleto);
	}
	@Override
	public List<Consulta> buscarFecha(LocalDateTime fecha1, LocalDateTime fecha2){
		return repo.buscarFecha(fecha1, fecha2.plusDays(1)); //agregamos 1 dia mas a la busqueda ya que el termino BETWEEN de las consultas no agrega al valor 2 en su punto original ya que resta 1 atras (>=15-08-2022 <19-08-2022)
	}

	@Override
	public List<ConsultaResumenDTO> listarResumen() {
		//List<Object[]>
		//[2,	"12/02/2022"]
		//[2,	"19/02/2022"]
		//[3,	"29/01/2022"]
		List<ConsultaResumenDTO> consultas = new ArrayList<>();
		
		repo.listarResumen().forEach(x -> {
			ConsultaResumenDTO cr = new ConsultaResumenDTO();
			cr.setCantidad(Integer.parseInt(String.valueOf(x[0])));
			cr.setFecha(String.valueOf(x[1]));
			consultas.add(cr);
		});
		
		return consultas;
	}
	@Override
	public byte[] generarReporte() {
		byte[] data = null;
		
		Map<String, Object> parametros = new HashMap<>();
		parametros.put("txt_titulo", "Prueba de titulo");
		
		File file;
		try {
			file = new ClassPathResource("/reports/consultas.jasper").getFile();
			JasperPrint print = JasperFillManager.fillReport(file.getPath(), parametros, new JRBeanCollectionDataSource(listarResumen()));
			data = JasperExportManager.exportReportToPdf(print);			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return data;
	}

}
