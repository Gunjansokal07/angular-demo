import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router : Router,
  ) { }

  isLogin(){
    let token = localStorage.getItem('token');
    if(!!localStorage.getItem('token')){
      return true;
    }
    else{
      return false;
    }
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  setToken(token){
    localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
