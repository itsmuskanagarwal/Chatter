import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  public userdetail!: {
    name: string;
    contact: string;
    email: string;
    password: string;
  };

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private service: StorageService
  ) {}

  ngOnInit(): void {}

  username: string = "";
  password: string = "";
    
  formData = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    confirmPassword : new FormControl(""),
    email : new FormControl(""),
    contact : new FormControl("")
  });

  onClickSubmit(data: any) {

    console.log(data.userame)
    console.log(data.password)
    // console.log(data.contact)
    // console.log(data.email)
    

    this.username = data.username;
    this.password = data.password;

    console.log('Login page: ' + this.username);
    console.log('Login page: ' + this.password);

    if (this.username == '' || this.password == '') 
    { 
      console.log("if is working")
      this._snackBar.open('Invalid Input', 'OK', {
        duration: 5000,
      });
    } 
    else
    { console.log("else is working")
      this.userdetail = 
      {
        name: data.username,
        contact: data.contact,
        email: data.email,
        password: data.password,
      };

      console.log(this.userdetail)

      this.service.getUserDetails(this.userdetail);
      this.router.navigate(['login']);
      this._snackBar.open
      (
        'Hello ' + this.username + ', You are Successfully Registered !!',
        'OK',
        {
          duration: 5000,
        }
      );
    }
  }
}
