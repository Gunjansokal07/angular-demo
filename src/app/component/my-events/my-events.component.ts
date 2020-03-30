import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../services/event-service.service';
import { debug } from 'util';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  events;
  err : string;
  noEventsMsg : string ="";
  constructor(
    private event: EventServiceService,
  ) { }

  ngOnInit() {
    this.getMyEvents();
  }

  getMyEvents() {
    this.event.getMyEvents().subscribe(
      (res) => {
        this.events = res;
        this.events = this.events.eventList;
        if(this.events.length==0){
          this.noEventsMsg = "No Events Created by you."
        }
      }, (err) => {
        err.status;
        if(err.status==401){
          this.err = 'Unauthorised Access'; 
        }
        if(err.status==500){
          this.err = 'Server Error'; 
        }
      });
  }


}
