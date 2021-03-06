import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router : Router,
    private authService : AuthService,
  ){}
  
  canActivate(){
    if(this.authService.isLogin()){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  };
}
