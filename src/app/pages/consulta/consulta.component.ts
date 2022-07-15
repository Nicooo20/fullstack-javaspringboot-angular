import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/_model/paciente';
import { Medico } from 'src/app/_model/medico';
import { Consulta } from 'src/app/_model/consulta';
import { MedicoService } from 'src/app/_service/medico.service';
import { PacienteService } from 'src/app/_service/paciente.service';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultaListaExamenDTO } from 'src/app/dto/consultaListaExamenDTO';
import { ConsultaService } from 'src/app/_service/consulta.service';
import * as moment from 'moment';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[];
  pacientes$: Observable<Paciente[]>;// Variable tipo observable para obtener la lista de los pacientes y llamar a la funcion listarPacientes de la clase PacienteService
  medicos: Medico[];
  medicos$: Observable<Medico[]>;
  especialidad: Especialidad[];
  especialidad$: Observable<Especialidad[]>;
  examenes$: Observable<Examen[]>;

  maxFecha: Date = new Date();
  diagnostico: string;
  tratamiento: string;
  detalleConsulta: DetalleConsulta[] = []; //inicializamos el objeto detalleConsulta para agregar los datos

  examenesSeleccionados: Examen[]= []; //inicializamos el objeto examenes para agregar los datos

  idPacienteSeleccionado: number;
  idMedicoSeleccionado: number;
  idEspecialidadSeleccionado: number;
  idExamenSeleccionado: number; //inicializamos la id del examen para que no se repita
  fechaSeleccionada: Date = new Date();



  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private examenService: ExamenService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {   //llamamos las funciones apenas carga la página , si no no cargan los datos de la base de datos (data)
    this.listarPacientes();
    this.listarMedicos();
    this.listarEspecialidad();
    this.listarExamenes();
  }

  listarPacientes() {
    /// ***forma tradicional de hacer una peticion con el suscribe**
    // this.pacienteService.listar().subscribe(data => {
    //   this.pacientes = data;
    // });

    this.pacientes$ = this.pacienteService.listar(); //forma 2 de hacer peticiones con variables tipo observable llamando directamente desde el html con la funcion async junto con la variable pacientes$
  }

  listarMedicos() {
    this.medicos$ = this.medicoService.listar();
  }

  listarEspecialidad() {
    this.especialidad$ = this.especialidadService.listar();
  }

  agregar(){
    let det= new DetalleConsulta();
    det.diagnostico=this.diagnostico;
    det.tratamiento=this.tratamiento;

    this.detalleConsulta.push(det);
  }

  removerDiagnostico(index: number){
    this.detalleConsulta.splice(index,1); //splice --> elimina el elemento de la posicion i y un solo elemento (1) -> (posicion, cantidad de elementos a eliminar)
  }

  listarExamenes(){
    this.examenes$ = this.examenService.listar();
  }

  agregarExamen(){
    if(this.idExamenSeleccionado > 0){ //si el examen que se eligio tiene un id mayor a 0, es decir que existe
      let cont = 0;

      for(let i = 0; i < this.examenesSeleccionados.length; i++){ //recorre el array examenesSeleccionados
        let examen = this.examenesSeleccionados[i];
        if(examen.idExamen === this.idExamenSeleccionado){ //si el examen que se eligio tiene el mismo id que el examen que se eligio en el html
          cont++; //se agrega 1 al contador
          break;
        }
      }

      if(cont > 0){
        let mensaje= "Ya se ha agregado este examen";
        this.snackBar.open(mensaje, 'Aviso', {duration: 2000});
      }else{
        this.examenService.listarPorId(this.idExamenSeleccionado).subscribe(data => {
          this.examenesSeleccionados.push(data);
        });
      }
    }


  }

  removerExamen(index: number){
    this.examenesSeleccionados.splice(index,1);
  }

  aceptar(){
    let medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;

    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;

    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    let consulta = new Consulta();
    consulta.medico = medico;
    consulta.especialidad = especialidad;
    consulta.paciente = paciente;
    consulta.numConsultorio = "C1";
    consulta.detalleConsulta = this.detalleConsulta;

    //let tzoffset = (new Date()).getTimezoneOffset() * 60000; //obtiene la diferencia de tiempo entre la zona horaria y la zona horaria de la base de datos
    //let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1); //obtiene la fecha actual en formato ISO
    //consulta.fecha = localISOTime;

    consulta.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss'); //libreria momentjs para formato de fecha de mejor forma

    let dto: ConsultaListaExamenDTO = new ConsultaListaExamenDTO();
    dto.consulta = consulta;
    dto.lstExamen = this.examenesSeleccionados;

    this.consultaService.registrarTransaccion(dto).subscribe(() => {
      this.snackBar.open("Se registro la consulta", "Aviso", {duration: 2000});

      setTimeout(()=>{
        this.limpiarControles();
      },2000);
    });
  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = null;
    this.tratamiento = null;
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionado = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
  }

}
