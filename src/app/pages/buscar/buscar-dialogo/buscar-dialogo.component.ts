import { ConsultaService } from 'src/app/_service/consulta.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consulta } from './../../../_model/consulta';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-dialogo',
  templateUrl: './buscar-dialogo.component.html',
  styleUrls: ['./buscar-dialogo.component.css']
})
export class BuscarDialogoComponent implements OnInit {


  consulta: Consulta;
  examenes: any;

  constructor(
    private dialogRef: MatDialogRef<BuscarDialogoComponent>, //para referenciar el dialogo
    @Inject(MAT_DIALOG_DATA) private data: Consulta, //para traer la data
    private consultaService: ConsultaService //para traer el service si ha que hacer consultas
  ) { }

  ngOnInit(): void {
    this.consulta = {...this.data};
    this.consultaService.listarExamenPorConsulta(this.data.idConsulta).subscribe(data => {
      this.examenes = data;
    });
  }
  cerrar(){
    this.dialogRef.close();
  }

}
