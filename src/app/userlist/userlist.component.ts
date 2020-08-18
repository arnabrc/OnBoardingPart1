import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: [any];
  closebtns: any;
  closeBtns: any;
  editBtns: any;
  imageShow: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(data => {
      this.users = data.sort((n1, n2) => n1.id > n2.id);
    }, (err) => {
      this.handleError(err);
    });
    this.closeBtns = document.getElementsByClassName('close');
    this.editBtns = document.getElementsByClassName('edit');
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error('Error Event');
    } else {
      console.log(`error status : ${err.status} ${err.statusText}`);
    }
    return throwError(err);
  }

  userSelect() {
    this.imageShow = !this.imageShow;
  }

  editUser(id: any) {
    window.alert('Edit: ' + id);
  }

  deleteUser(id: any) {
    this.users.splice(id, 1);
  }

}
