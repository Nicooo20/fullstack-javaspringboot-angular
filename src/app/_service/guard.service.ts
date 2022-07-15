import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuService } from 'src/app/_service/menu.service';
import { LoginService } from 'src/app/_service/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate { //con este servicio prohibmos a los usuarios ingresar por las distintas URL a las interfaces

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){ //la propiedad canActivate espera un TRUE o FALSE como respuesta para operar
    //1) VERIFICAR SI ESTA LOGUEADO
    let rpta = this.loginService.estaLogueado(); //inicializamos una variable y llamamos al service de login , luego llamamos al evento para verificar el inicio de sesion
    if(!rpta){ //si la respuesta es falsa entonces
      this.loginService.cerrarSesion(); //llamamos al service login para llamar el evento de cerrar sesion
      return false;
    }
    //return true; //si es verdadero entonces permite ingresar despues de ingresar por el login
    //2) VERIFICAR SI EL TOKEN NO HA EXPIRADO
    const helper = new JwtHelperService(); //incializamos una variable para llamar la libreria de Jwt
    let token = sessionStorage.getItem(environment.TOKEN_NAME); //inicializamos la variable para saber si existe un token almacenado en la session storage
    if (!helper.isTokenExpired(token)){ //si el token no esta expirado
    //3) VERIFICAR SI TIENES EL ROL NECESARIO PARA ACCEDER A ESA PAGINA
    let url = state.url;

    const decodedToken = helper.decodeToken(token);
      return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data: Menu[]) =>{ //se trabaja con el pipe para trabajar la data y solo la expone alfinal
      this.menuService.setMenuCambio(data);

      let cont = 0;
      for (let m of data){  //recorremos las opciones de menu
        if(url.startsWith(m.url)){//si dentro de las opciones de menu esta la url que busco
          cont++; //le mandamos un contador como si fuera un true ->1
          break;
        }
      }
      if(cont>0){ //si del contador es mayor a 1 entonces encontro data
        return true; //mandamos true para que el canActivate active su funcion de mostrar la data
      } else {
        this.router.navigate(['/pages/not-403']); //si no redireccionamos a una pagina de error
        return false;
      }
      }));

    } else {
      this.loginService.cerrarSesion();  //llamamos al service login para llamar el evento de cerrar sesion
      return false;
    }
  }
}
