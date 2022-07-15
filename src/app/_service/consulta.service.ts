import { HttpClient } from '@angular/common/http'; //asume que las salidas de la data son  en formato JSON
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConsultaListaExamenDTO } from '../dto/consultaListaExamenDTO';
import { FiltroConsultaDTO } from '../dto/filtroConsultaDTO';
import { Consulta } from '../_model/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url: string = `${environment.HOST}/consultas`;

  constructor(
    private http: HttpClient
  ) { }

  registrarTransaccion(consultaDTO: ConsultaListaExamenDTO) {
    return this.http.post(this.url, consultaDTO);
  }

  buscarFecha(fecha1: string, fecha2: string) {
    return this.http.get<Consulta[]>(`${this.url}/buscar?fecha1=${fecha1}&fecha2=${fecha2}`);
  }

  buscarOtros(filtroConsulta: FiltroConsultaDTO) {
    return this.http.post<Consulta[]>(`${this.url}/buscar/otros`, filtroConsulta);
  }

  listarExamenPorConsulta(idConsulta: number){
    return this.http.get<ConsultaListaExamenDTO>(`${environment.HOST}/consultaexamenes/${idConsulta}`);
  }

  listarResumen(){
    return this.http.get<any[]>(`${this.url}/listarResumen`);
  }

  generarReporte(){
    return this.http.get(`${this.url}/generarReporte`, { responseType: 'blob' }); //responseType -> se agrega para crear un cambio de datos de la forma que se esta enviando la generacion del PDF para llevarlo como un JSON
  }

  subirArchivo(data: File){
    let formdata: FormData = new FormData();
    formdata.append('adjunto', data);
    return this.http.post(`${this.url}/guardarArchivo`, formdata);
  }


  leerArchivo(id: number){
    return this.http.get(`${this.url}/leerArchivo/${id}`,{
      responseType: 'blob'
    });

  }
}
