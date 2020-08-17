import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date: any;

  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTimestamp();
  }

  getTimestamp() {
    return this.date = new Date();
  }

  checkUserList() {
    this.router.navigate(['/userlist']);
  }

}
