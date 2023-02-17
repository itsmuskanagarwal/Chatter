import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  formData: FormGroup | any;

  constructor(
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.formData = this.formBuilder.group({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      contact: '',
    });
  }

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

    if (this.validFields == true) {
      if (this.validPassword == true)
        {

          console.log('working');
          this.crudService.addUser(this.formData.value).subscribe((res) => {
            console.log('Data added!!!!',res);
            this.ngZone.run(() => this.router.navigateByUrl('/login'));
          });

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
