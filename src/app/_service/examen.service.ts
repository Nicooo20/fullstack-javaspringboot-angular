import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Examen } from '../_model/examen';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends GenericService<Examen>{

  private examenCambio: Subject<Examen[]> = new Subject<Examen[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();


  constructor(protected override http: HttpClient) {
    super(http,`${environment.HOST}/examenes`); //el super es para que sepa que es un service de tipo generic y luego se le pasa el httpClient y la url
  }

    //////get & set ////
    getExamenCambio(){
      return this.examenCambio.asObservable();
    }

    setExamenCambio(examenes: Examen[]){
      this.examenCambio.next(examenes);
    }

    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }

    setMensajeCambio(mensaje: string){
      this.mensajeCambio.next(mensaje);
    }
}
