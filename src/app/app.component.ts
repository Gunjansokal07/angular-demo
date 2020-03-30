import { Component, OnInit, DoCheck } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userData = [
    { id: 1, name: 'John'},
    { id: 2, name: 'abc'},
    { id: 22, name: 'xyz'},
    { id: 173, name: 'user'},
  ];
  constructor() {
    
  }


}