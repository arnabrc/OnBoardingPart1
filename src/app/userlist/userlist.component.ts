import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogues/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  confirmation: string;
}

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

  constructor(private apiService: ApiService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

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
    this.imageShow = false;
    window.alert('Edit: ' + id);
  }

  deleteUser(id: any) {
    this.imageShow = false;
    this.users.splice(id, 1);
  }

  openDialog(id: any) {
    const user = this.users[id];
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: `Are you sure want to delete user ${user.login}?`,
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    const snack = this.snackBar.open('Confirmation bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        this.deleteUser(id);
        a.remove();
        snack.dismiss();
        this.snackBar.open('Confirmation bar closing in a few seconds', 'Fechar', {
          duration: 2000,
        });
      }
    });
  }
}
