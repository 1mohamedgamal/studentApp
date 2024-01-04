import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  receivedBoolean: boolean = true;

  constructor() {}

  handleBooleanChange(value: boolean) {
    this.receivedBoolean = value;
  }

  ngOnInit() {}
}
