import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public userdetail!: {
    "name": string;
    "contact": string;
    "email": string;
    "password": string;
  };


  constructor(private _snackBar: MatSnackBar, private _router:Router, private service:StorageService) {}

  signup(username:any, usercontact:any, useremail:any, userpass:any){
    this._router.navigate(['login']);
    this.userdetail={"name": username,
    "contact": usercontact,
    "email":useremail,
    "password":userpass
  };
    this.service.getUserDetails(this.userdetail);
    //console.log(this.userdetail);
    this._snackBar.open("Hello "+username+", You are Successfully Registered !!","OK",{
      duration:5000
    });

  }
  ngOnInit(): void {

  }

}
