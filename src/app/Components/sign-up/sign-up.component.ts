import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  formData: FormGroup | any;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.formData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      contact: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  msg = {
    feilds: 'Please fill all the fields',
    password: 'Password does not match',
    contact: 'Contact number already exists',
    email: 'Email address already exists',
  };

  username: string = '';
  password: string = '';

  USERS: user[] = [];

  validFields: boolean = true;
  validPassword: boolean = true;
  validContact: boolean = true;
  validEmail: boolean = true;

  onClickSubmit(data: any) {
    // console.log(data.userame);
    // console.log(data.password);
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

    //fetching all registered users
    this.crudService.getUsers().subscribe((res) => {
      this.USERS = res;
      console.log(this.USERS)
      for (let user in this.USERS) {
        //removing the logged in user from the chatting list
        if (this.USERS[user].email == data.email) {
          this.validEmail = false;
          console.log(this.validEmail)
        }
        else{
          this.validEmail = true;
        }

        if (this.USERS[user].contact == data.contact) {
          this.validContact = false;
          console.log(this.validContact)
        }
        else{
      this.validContact = true;
        }
      }
    });

    console.log(this.validContact)
    console.log(this.validEmail)
    
    if (this.validEmail && this.validContact) {
      if (this.validFields && this.validPassword) {
        console.log('working');
        data.username =
          data.username.charAt(0).toUpperCase() + data.username.slice(1);

        this.crudService.addUser(this.formData.value).subscribe((res) => {
          if (res['Success']) {
            console.log('Data added!!!!', res);
            this.ngZone.run(() => this.router.navigateByUrl('/login'));
            this._snackBar.open(
              'Hello ' + this.username + ', You are Successfully Registered !!',
              'OK',
              {
                duration: 5000,
              }
            );
          } else {
            console.log('Error', res);
            this._snackBar.open(
              'Hello! There was an error while registering. Please try again later',
              'OK',
              {
                duration: 5000,
              }
            );
          }
        });
      }
    }
  }
}
