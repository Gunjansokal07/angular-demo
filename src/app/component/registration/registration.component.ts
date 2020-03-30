import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CustomPasswordValidator } from './customPasswordValidator';
import { UserServiceService } from '../../services/user-service.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration: FormGroup;
  submitted: boolean = false;
  anyError : boolean = false;
  alreadyRegister : boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService : UserServiceService,
    private router : Router,
    private auth : AuthService,
  ) {
    
  }

  ngOnInit() {
    this.registrationForm();
  }

  registrationForm() {
    this.registration = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      cpassword: ['', [Validators.required, Validators.minLength(4)]],
      mobile: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
    },
      {
        validator : CustomPasswordValidator.MatchPassword
        
      }
    );
  }

  get getControls() {
    return this.registration.controls;
  }

  registrationSubmit() {
    this.submitted = true;
    this.alreadyRegister = true;

    if (this.registration.invalid) {
      return;
    }

    let userDetails = {
      'username' : this.registration.get('userName').value,
      'email' : this.registration.get('email').value,
      'password' : this.registration.get('password').value,
      'mobile' : this.registration.get('mobile').value,
    }

    this.userService.register(userDetails).subscribe(
      (res)=>{
        if(res.status == 0){
          this.alreadyRegister = true; 
        }
        if(res.status == 1){
          this.alreadyRegister = false; 
          this.auth.setToken(res.token);
          this.router.navigate(['/home']);
        }
      },
      (err)=>{
        this.anyError = true;
      }
    );


  }

}
