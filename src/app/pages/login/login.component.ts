import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';
import '../../../assets/login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;
  mensaje: string;
  error: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    this.loginService.login(this.usuario, this.clave).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token); //almacenamos el token en memoria
      this.router.navigate(['/pages/inicio']); //si el login es el exitoso manda al inicio de la pagina
    });
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

}
