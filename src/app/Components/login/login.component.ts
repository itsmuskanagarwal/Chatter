import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/authservice.service';
import { CrudService } from 'src/app/services/crud.service';
import { StorageService } from 'src/app/services/storage.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthServiceService],
})
export class LoginComponent implements OnInit {

  validPassword: boolean | undefined;
  hide = true;
  data: any = [];


  // public password : string | any;
  // public email : string | any;

  constructor(
    public authservice: AuthServiceService,
    private routes: Router,
    private crudService: CrudService,
    private storage: StorageService,
    private ngZone: NgZone,
    private cookieService: CookieService,
    private fb: FormBuilder,
  ) {}

  msg = '';

  ngOnInit() {}


  check(uname: string, pwd: string) {
    this.crudService.verifyUser(uname, pwd).subscribe(
      (res) => {
        this.data = res;
        console.log(res);

        if (this.data.email == uname) {
          
          // set isLoggedIn cookie to true for 1 day
          // this.cookieService.set('isLoggedIn', 'true', 1);
          // console.log(this.cookieService.get('isLoggedIn'));

          // localStorage.setItem('isLoggedIn',"true")

          // this.storage.isLoggedIn = true; 
          // console.log(this.storage.isLoggedIn);

          localStorage.setItem('isLoggedIn', 'true');
          
          localStorage.setItem('myData', JSON.stringify(this.data));
          this.storage.data = JSON.parse(
            localStorage.getItem('myData') as string
            );
            
            console.log(this.data);
            console.log(this.storage.data);

            console.log("login", localStorage.getItem('myData'))
            console.log("login", localStorage.getItem('isLoggedIn'))
            
            this.ngZone.run(() => this.routes.navigateByUrl('/home'));

        } 
        
        else 
        {
          this.validPassword = true;
          this.msg =
            'Invalid username or password. If you are a new user, please register ';
        }
      },
      (error) => {
        console.log('Error:', error);

        this.validPassword = true;
        this.msg =
          'Invalid username or password. If you are a new user, please register ';
        // Handle the error here, such as showing an error message to the user
      }
    );
  }
}
