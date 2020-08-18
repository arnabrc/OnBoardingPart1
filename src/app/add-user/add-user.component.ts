import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { browserRefresh } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public browserRefresh: boolean;
  login: any;
  id: any;
  image: any;
  profileFormEdit: FormGroup;
  fileData = null;
  @Output() addUserEmitter = new EventEmitter<any>();
  submitted: boolean = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.browserRefresh = browserRefresh;
    if (this.browserRefresh) {
      this.router.navigate(['/userlist']);
    }
    this.profileFormEdit = this.fb.group({
      login: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      id: ['', Validators.compose([Validators.required])],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileFormEdit.valid) {
      this.addUserEmitter.emit(this.profileFormEdit.value);
      // this.router.navigate(['/userlist']);
    }
  }

  onCancel() {
    this.router.navigate(['/userlist']);
  }

}
