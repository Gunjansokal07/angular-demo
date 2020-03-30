import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : FormGroup;
  submitted : boolean = false;
  isAuthorized : boolean = false;
  errorMsg : string = '';
  constructor(
    private fb : FormBuilder,
    private userService : UserServiceService,
    private router : Router,
    private auth : AuthService,
  ) { 

  }

  ngOnInit() {
    this.loginForm();
  }

  loginForm(){
    this.login = this.fb.group({
      'email' : ['',[Validators.required, Validators.email]],
      'password' : ['',Validators.required],
    });
  }

  get getControls(){
    return this.login.controls;
  }

  loginSubmit(){
    this.submitted = true;
    if(this.login.invalid){
      return;
    }

    let user = {
      'email' : this.login.get('email').value,
      'password' : this.login.get('password').value,
    }
    this.userService.login(user).subscribe(
      (res)=>{
        if(res.status==200){
          this.isAuthorized = true;
          this.auth.setToken(res.token);
          this.router.navigate(['/home']);
        }
      },
      (err)=>{
        if(err.status == 401){
          this.isAuthorized = false;
          this.errorMsg = 'Invalid Credentials';
        }
        if(err.status == 500){
          this.isAuthorized = false;
          this.errorMsg = 'Something Went Wrong';
        }
      }
    );
  }



}
