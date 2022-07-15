import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  dataSource: MatTableDataSource<Paciente>;
  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'acciones'];

  cantidad: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //estado: boolean = false;

  constructor(
    private pacienteService: PacienteService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    //Al haber cambios de datos con la opcion de editar, desde service mandamos a la clase padre todos los datos donde hubieron cambios de alguna parte de la data
    //con el parametro "next" de la clase hija utilizando la variable de reaccion o reactiva (pacienteCambio) activamos este bloque de codigo
    this.pacienteService.getPacienteCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.pacienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.pacienteService.listarPageable(0,10).subscribe(data =>{
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);  //llamamos solo al content, ya que solo necesitamos esos valores de la data y  no los demas del arreglo
    });

    /*
    //para listar en la tabla de paciente los valores en la pagina
    this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/


  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
    /*this.dataSource.filterPredicate = (data: Paciente, filter: string) => {
      return data.nombres.toLowerCase().includes(filter) || data.apellidos.toLowerCase().includes(filter);
    }})*/
  }

  eliminar(id: number){
    this.pacienteService.eliminar(id).subscribe(() => {
      this.pacienteService.listar().subscribe(data => {
        this.pacienteService.setPacienteCambio(data);
        this.pacienteService.setMensajeCambio('SE ELIMINO');
      });
    });
  }

  /*cambiarEstado(){
    return this.estado = true;
  }*/

  mostrarMas(e:any){
    this.pacienteService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => { //mandamos la pagina actual con el tamaño de pagina
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content); //le pasamos la nueva data a la tabla con el siguiente content
    })

  }


}
