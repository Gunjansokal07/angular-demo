import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventServiceService } from '../../services/event-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  createForm: FormGroup;
  submitted: boolean = false;
  timeErr: string = '';
  successMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private eventService: EventServiceService,
    private router : Router,
  ) {
    this.createEventForm();
  }

  ngOnInit() {
  }

  createEventForm() {
    this.createForm = this.fb.group({
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'prerequisite': ['', [Validators.required]],
      'date': ['', [Validators.required]],
      'time': this.fb.group({
        'startTime': [{ hour: 0, minute: 0 }, [Validators.required]],
        'endTime': [{ hour: 0, minute: 0 }, [Validators.required]],
      }),
    });
  }

  get getControls() {
    return this.createForm.controls;
  }

  createEventSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }

    /********START :- Compare the timing with current********/
    let eventDate = this.createForm.controls.date.value;
    let startTime = this.createForm.controls.time.value.startTime;
    let endTime = this.createForm.controls.time.value.endTime;
    let today = new Date();
    let eventStartTime = new Date(eventDate.year, (eventDate.month - 1), eventDate.day, startTime.hour, startTime.minute);
    let eventEndTime = new Date(eventDate.year, (eventDate.month - 1), eventDate.day, endTime.hour, endTime.minute);

    if (today.getTime() >= eventStartTime.getTime()) {
      this.timeErr = "Event Date should be greater than today's.";
      return;
    }
    if (eventEndTime.getTime() <= eventStartTime.getTime()) {
      this.timeErr = "Event end time should be greater than start time.";
      return;
    }
    this.timeErr = '';
    /*********END :- Compare the timing with current********/

    let a = eventStartTime.getTime();
    let eventInfo = {
      "title": this.createForm.get('title').value,
      "description": this.createForm.get('description').value,
      "prerequisite": this.createForm.get('prerequisite').value,
      "startTime": eventStartTime.getTime(),
      "endTime": eventEndTime.getTime(),
    }

    this.eventService.createEvent(eventInfo).subscribe(
      (res) => {
        this.successMsg = res.msg;
        this.router.navigate(['/my-events']);
      },
      (err) => {
        this.successMsg = err.msg;
      }
    );

  }

}
