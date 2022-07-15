import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  id: number = 0;
  edicion: boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router, //para recagar la pagina tras agregar o editar datos
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void { //para inicializar los datos vacios
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'telefono': new FormControl(''),
      'direccion': new FormControl(''),
      'email': new FormControl('')
    });

    this.route.params.subscribe(data => {  //Al no detectar nada en la ruta, inicializa los valores en blanco en el ngOnInit, pero si se oprime la opcion edicion traera los valores de la data ya guardada
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });

  }

  initForm() { //para traer los datos de la data
    if (this.edicion) {
      this.pacienteService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'telefono': new FormControl(data.telefono),
          'direccion': new FormControl(data.direccion),
          'email': new FormControl(data.email)
        });
      });
    }
  }

  operar() { //para guardar o editar los datos
    let paciente = new Paciente();
    paciente.idPaciente = this.form.value['id'];
    paciente.nombres = this.form.value['nombres'];
    paciente.apellidos = this.form.value['apellidos'];
    paciente.dni = this.form.value['dni'];
    paciente.telefono = this.form.value['telefono'];
    paciente.direccion = this.form.value['direccion'];
    paciente.email = this.form.value['email'];

    if (this.edicion) {
      //Editar
      //FORMA IDEAL
      this.pacienteService.modificar(paciente).pipe(switchMap( () => {
        return this.pacienteService.listar();
      }))
      .subscribe(data => {
        this.pacienteService.setPacienteCambio(data);
          this.pacienteService.setMensajeCambio('SE MODIFICO');
      });

      /*this.pacienteService.modificar(paciente).subscribe(() => {
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.pacienteCambio.next(data); //mandamos la informacion editada a la clase padre
          this.pacienteService.mensajeCambio.next('SE MODIFICO');
        });
      });*/
    } else {
      //REGISTRAR
      this.pacienteService.registrar(paciente).subscribe(() => {
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.setPacienteCambio(data); //mandamos la informacion editada a la clase padre
          this.pacienteService.setMensajeCambio('SE REGISTRO');
        });
      });
    }
    this.router.navigate(['/pages/paciente']); //para recargar la pagina tras algun evento ejecutado (edicion o registrar)

  }

}
