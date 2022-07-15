import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) { //metodo para confirmar concordancia con la nueva contraseña de / contraseña y confirmar contraseña
        let password = AC.get('password').value; //inicializamos la primera contraseña (nueva)
        let confirmPassword = AC.get('confirmPassword').value; //inicializamos la variable de confirmacion de contraseña
        if (password != confirmPassword && confirmPassword.length > 0) { //si las contraseñas no coinciden entonces
            AC.get('confirmPassword').setErrors({ MatchPassword: true }) //activamos el matchpassword true para que muestre mensaje de error
        } else {
            return null
        }
    }
}
