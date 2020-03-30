import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, filter } from 'rxjs/operators';

const ApiUrl = environment.nodeApiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private httpClient :  HttpClient,
  ) { }

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  register(user): Observable<any> {
    return this.httpClient.post(ApiUrl+'/user/register', user, this.options).pipe(
      map(data => {
          return data;
      })
    );
  }
  login(user) : Observable<any>{
    return this.httpClient.post(ApiUrl+'/user/login',user).pipe(
      map(data => {
        return data;
      }),
    );
  }

}
