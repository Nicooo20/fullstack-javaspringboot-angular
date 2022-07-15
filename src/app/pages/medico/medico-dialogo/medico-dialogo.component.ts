import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
})
export class MedicoDialogoComponent implements OnInit { //ts del modal

  medico: Medico;
  constructor(
    private dialogRef: MatDialogRef<MedicoDialogoComponent>, //para cerrar el modal
    @Inject(MAT_DIALOG_DATA) public data: Medico,
    private medicoService: MedicoService
  ){ }

  ngOnInit(): void {
    this.medico = {... this.data}; //copiamos el objeto data a medico atraves del operador spread {...} para clonar los datos en casos donde se trabaje con muchos objetos(datos)
    // this.medico = new Medico();
    // this.medico.idMedico = this.data.idMedico;
    // this.medico.nombres = this.data.nombres;
    // this.medico.apellidos = this.data.apellidos;
    // this.medico.codmedi = this.data.codmedi;
    // this.medico.fotoUrl = this.data.fotoUrl;
  }

  operar(){
    if(this.medico != null && this.medico.idMedico > 0){ //si medico no viene vacio y la id es mayor a 0, es porque se puede editar
      //modificar
      this.medicoService.modificar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      }))
      .subscribe(data => {
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio('Se modificaron los cambios');
      });

    }else{
      //registrar
      this.medicoService.registrar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      }))
      .subscribe(data => {
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio('Se registro un nuevo medico');
      });
    }
    this.cerrar();
  }

  cerrar(){
  this.dialogRef.close(); //para cerrar el modal
  }

}
