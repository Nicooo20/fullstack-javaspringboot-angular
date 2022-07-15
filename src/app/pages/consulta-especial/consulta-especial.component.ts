import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { MedicoService } from 'src/app/_service/medico.service';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { Examen } from 'src/app/_model/examen';
import { Paciente } from 'src/app/_model/paciente';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/_model/medico';
import { Especialidad } from 'src/app/_model/especialidad';
import { map, Observable } from 'rxjs';
import { PacienteService } from 'src/app/_service/paciente.service';
import { ExamenService } from 'src/app/_service/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import * as moment from 'moment';
import { ConsultaListaExamenDTO } from 'src/app/dto/consultaListaExamenDTO';
import { Consulta } from 'src/app/_model/consulta';

@Component({
  selector: 'app-consulta-especial',
  templateUrl: './consulta-especial.component.html',
  styleUrls: ['./consulta-especial.component.css']
})
export class ConsultaEspecialComponent implements OnInit {

  form: FormGroup;
  pacientes: Paciente[];
  medicos: Medico[];
  especialidades: Especialidad[];
  examenes: Examen[];
  mensaje: string;


  //utiles para el autocomplete
  myControlPaciente: FormControl = new FormControl(); //para saber que escribe el cliente en la caja de texto input
  myControlMedico: FormControl = new FormControl();

  pacientesFiltrados$: Observable<Paciente[]>;
  medicosFiltrados$: Observable<Medico[]>;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  pacienteSeleccionado: Paciente;
  medicoSeleccionado: Medico;
  especialidadSeleccionada: Especialidad;
  examenSeleccionado: Examen;

  diagnostico: string;
  tratamiento: string;

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];

  constructor(
    private consultaService: ConsultaService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private especialidadService: EspecialidadService,
    private examenService: ExamenService,
    private snackBar: MatSnackBar


  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'paciente': this.myControlPaciente, //referencia de variable - linea 28--
      'especialidad': new FormControl,
      'medico': this.myControlMedico, //referencia a la variable -linea 29 -
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl(''),
    });

    this.listarInicial();

    this.pacientesFiltrados$ = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val))); //buscamos lo que ingresa el cliente con la funcion map
    this.medicosFiltrados$ = this.myControlMedico.valueChanges.pipe(map(val => this.filtrarMedicos(val)));
  }

  filtrarPacientes(val: any){

    if(val != null && val.idPaciente > 0){
      return this.pacientes.filter(el => //funcion filter propia de js
      el.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || el.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) ||el.dni.toLowerCase().includes(val.toLowerCase())
      );
    }else{
    return this.pacientes.filter(el => //funcion filter propia de js
    el.nombres.toLowerCase().includes(val?.toLowerCase()) || el.apellidos.toLowerCase().includes(val?.toLowerCase()) ||el.dni.toLowerCase().includes(val.toLowerCase()));
    }
  }

  mostrarPaciente(val: any){ //funcion que devuelve en forma de cadena de string las variables en la caja de texto
    return val ? `${val.nombres}  ${val.apellidos}`: val;  //si val detecta ? entonces muestra la cadena si no lo muestra tal cual : val
  }

  filtrarMedicos(val: any){

    if(val != null && val.idMedico > 0){
      return this.medicos.filter(el => //funcion filter propia de js
      el.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || el.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) ||el.codmedi.toLowerCase().includes(val.toLowerCase())
      );
    }else{
      console.log("prueba error");

    return this.medicos.filter(el => //funcion filter propia de js
    el.nombres.toLowerCase().includes(val?.toLowerCase()) || el.apellidos.toLowerCase().includes(val?.toLowerCase()) ||el.codmedi.toLowerCase().includes(val.toLowerCase()));
    }
  }

  mostrarMedico(val: any){ //funcion que devuelve en forma de cadena de string las variables en la caja de texto
    return val ? `${val.nombres}  ${val.apellidos}`: val;  //si val detecta ? entonces muestra la cadena si no lo muestra tal cual : val
  }




  listarInicial(){
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });

    this.medicoService.listar().subscribe(data =>{
      this.medicos  = data;
    });

    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });

    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    });

  }

  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }

  agregar() { //agregar detalle

    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = `Debe agregar un diagnóstico y tramiento`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }
  agregarExamen() {
    if (this.examenSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.examenSeleccionado.idExamen) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = `El examen se encuentra en la lista`;
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        this.examenesSeleccionados.push(this.examenSeleccionado);
      }
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }


  aceptar(){
    let consulta = new Consulta();
    consulta.paciente = this.form.value['paciente'];
    consulta.medico = this.form.value['medico'];
    consulta.especialidad = this.form.value['especialidad'];
    consulta.numConsultorio = "C1";
    consulta.fecha = moment(this.form.value['fecha']).format('YYYY-MM-DDTHH:mm:ss');
    consulta.detalleConsulta = this.detalleConsulta;

    let consultaListaExamenDTO = new ConsultaListaExamenDTO();
    consultaListaExamenDTO.consulta = consulta;
    consultaListaExamenDTO.lstExamen = this.examenesSeleccionados;

    this.consultaService.registrarTransaccion(consultaListaExamenDTO).subscribe(() => {
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000)

    });

  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.pacienteSeleccionado = null;
    this.especialidadSeleccionada = null;
    this.medicoSeleccionado = null;
    this.examenSeleccionado = null;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
    //para autocompletes
    this.myControlPaciente.reset();
    this.myControlMedico.reset();
  }
}
