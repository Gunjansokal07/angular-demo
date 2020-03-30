import { AbstractControl } from '@angular/forms';

export class CustomPasswordValidator {
    static MatchPassword(control : AbstractControl) : {[key : string] : boolean}|null{
        let password = control.get('password').value;
        let cpassword = control.get('cpassword').value;

        if(password != cpassword){
            control.get('cpassword').setErrors( {'cpassword' : true});
        }
        else{
            return null;
        }
    }
}