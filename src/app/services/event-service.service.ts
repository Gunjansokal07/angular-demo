import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
var ApiUrl = environment.nodeApiUrl;

@Injectable({
  providedIn: 'root'
})

export class EventServiceService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private option = { headers: new HttpHeaders().set('Content-type', 'application/json') };

  createEvent(eventInfo): Observable<any> {
    return this.httpClient.post(ApiUrl + '/event/create', eventInfo, this.option).pipe(
      map(data => {
        return data;
      })
    );
  }
  /*
  *All events
  */
  getAllEvents(): Observable<any> {
    return this.httpClient.get(ApiUrl + '/event/get-all-events', this.option).pipe(
      map(data => {
        return data;
      })
    );
  }
  /*
  *Get all events of other user
  *When Logged in user clicks on any other user name then he is redirected to all events
  * of that user.
  */
  getUserEvents() {

  }
  getMyEvents() {
    return this.httpClient.get(ApiUrl + '/event/get-my-events', this.option).pipe(
      map(data => {
        return data;
      })
    );
  }
  deleteMyEvents() {

  }
  updateMyEvents() {

  }
  interest(eventId): Observable<any>{
    return this.httpClient.put(`${ApiUrl}/event/interest-event/${eventId}`,this.option).pipe(
      map((data)=> { return data; }),
    );
  }

}
