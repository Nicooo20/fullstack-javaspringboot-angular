import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-not403',
  templateUrl: './not403.component.html',
  styleUrls: ['./not403.component.css']
})
export class Not403Component implements OnInit {

  usuario: string;

  constructor() { }

  ngOnInit() {


    const helper = new JwtHelperService(); //incializamos la variable para llamar al Jwt
    let token = sessionStorage.getItem(environment.TOKEN_NAME); //inicializamos la variable token para obtener el token de la sessionStorage
    const decodedToken = helper.decodeToken(token); //decodificamos el token para obtener los datos del token y el usuario
    this.usuario = decodedToken.user_name; //mostramos el usuario
  }

}
