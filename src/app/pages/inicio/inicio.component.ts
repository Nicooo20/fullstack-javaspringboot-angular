import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt"; //con esta importacion podemos obtener el token de un usuario individual
import { MenuService } from 'src/app/_service/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: string;

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();

    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token);  //decodificamos el token para indentificar al usuario que esta en la sesion
    console.log(decodedToken);
    this.usuario = decodedToken.user_name;

    this.menuService.listarPorUsuario(this.usuario).subscribe(data => { //traemos los datos del usuario que inicio sesion y mandamos las opciones habilitadas por base de datos (url)
      this.menuService.setMenuCambio(data);
    });
  }

}
