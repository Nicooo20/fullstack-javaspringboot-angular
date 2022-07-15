import { PasswordValidation } from './match';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoginService } from './../../../../_service/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  form: any;
  token: string;
  mensaje: string;
  error: string;
  rpta: number;
  tokenValido: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService : LoginService
  ) { }


  ngOnInit() {
    this.form = this.fb.group({
      password: [''], //inicializamos la caja de texto vacia
      confirmPassword: [''] //inicializamos la caja de texto vacia
    }, {
      validator: PasswordValidation.MatchPassword //llamamos al metodo para validar las contraseñas la nueva y la de confirmacion de la linea 31, 32 de las variables del html
    });

    this.route.params.subscribe((params : Params) => {
      this.token = params['token'];
      this.loginService.verificarTokenReset(this.token).subscribe(data => {

        if(data === 1){
          this.tokenValido = true;
        }else{
          this.tokenValido = false;
          setTimeout( () => {
            this.router.navigate(['login']);
          }, 2000)
        }
      });
    })
  }

  onSubmit(){
    let clave: string = this.form.value.confirmPassword;
    this.loginService.restablecer(this.token, clave).subscribe(data => {
      this.mensaje = 'Se cambio la contraseña';

        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000);
    });
  }

}
