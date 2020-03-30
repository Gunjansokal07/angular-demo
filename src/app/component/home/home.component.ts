import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../services/event-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events;
  err: string;
  constructor(
    private eventService: EventServiceService,
  ) { }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(
      (res) => {
        this.events = res.eventList;
        this.events;
      }, (err) => {
        err.status;
        if (err.status == 401) {
          this.err = 'Unauthorised Access';
        }
        if (err.status == 500) {
          this.err = 'Server Error';
        }
      });
  }
  interested(eventId) {
    //Add eid+uid in new schema
    this.eventService.interest(eventId).subscribe(
      (res) => {
        let res1 = res;
        debugger
      },
      (err) => {
        err;
        debugger
      });
  }

}
