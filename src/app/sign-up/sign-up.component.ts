import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { user } from '../modules/user';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  public userDetail!: user;
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private service: StorageService
  ) {}

  ngOnInit(): void {}

  msg = {
    feilds: 'Please fill all the fields',
    password: 'Password does not match',
  };

  username: string = '';
  password: string = '';

  validFields: boolean | undefined;
  validPassword: boolean | undefined;
  validContact: boolean | undefined;

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
  });

  onClickSubmit(data: any) {
    console.log(data.userame);
    console.log(data.password);
    // console.log(data.contact)
    // console.log(data.email)

    this.username = data.username;
    this.password = data.password;

    console.log('Login page: ' + this.username);
    console.log('Login page: ' + this.password);

    for (var key in data) {
      console.log(data[key]);
      if (data[key] == '' || data[key] == null) {
        this.validFields = false;
        break;
      } else {
        this.validFields = true;
      }
    }

    if (data.password == data.confirmPassword) {
      this.validPassword = true;
    } else {
      this.validPassword = false;
    }

    if (this.validFields == true) {
      if (this.validPassword == true) {
        console.log('working');
        this.userDetail = {
          name: data.username,
          contact: data.contact,
          email: data.email,
          password: data.password,
        };

        console.log(this.userDetail);

        this.service.getUserDetails(this.userDetail);
        this.router.navigate(['login']);
        this._snackBar.open(
          'Hello ' + this.username + ', You are Successfully Registered !!',
          'OK',
          {
            duration: 5000,
          }
        );
      }
    }
  }
}
