import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/authservice.service';
import { CrudService } from 'src/app/services/crud.service';
import { StorageService } from 'src/app/services/storage.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from 'src/app/services/socket.service';

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
  private socket: any;
  onlineUsers: [] | any;

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
    private socketService: SocketService
  ) {}

  msg = '';

  ngOnInit() {}

  check(uname: string, pwd: string) {
    // console.log(uname,pwd);

    this.crudService.verifyUser(uname, pwd).subscribe(
      (res) => {
        this.data = res;
        console.log(res);

        if (this.data.email == uname) {
          this.socketService.connect();
          this.socketService.addonlineUser(uname);

          localStorage.setItem('isLoggedIn', 'true');

          localStorage.setItem('myData', JSON.stringify(this.data));
          this.storage.data = JSON.parse(
            localStorage.getItem('myData') as string
          );

          console.log(this.data);
          console.log(this.storage.data);

          console.log('login', localStorage.getItem('myData'));
          console.log('login', localStorage.getItem('isLoggedIn'));

          this.ngZone.run(() => this.routes.navigateByUrl('/home'));
        } else {
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
