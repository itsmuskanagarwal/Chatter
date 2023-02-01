import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  @Output() usernamefromsignup=new EventEmitter();

  constructor(private _snackBar: MatSnackBar, private _router:Router) {}

  signup(username:string, usercontact:string, useremail:string, userpass:string){
    this._router.navigate(['landing']);
    this.usernamefromsignup.emit(username);
    this._snackBar.open("Hello "+username+", You are Successfully Registered !!","OK",{
      duration:5000
    });
  }

  Roles: any = ['Admin', 'Author', 'Reader'];
  ngOnInit(): void {

  }

}
