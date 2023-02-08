import { Component } from '@angular/core';
// import { User } from '../user';
// import { USER } from '../user_mockup';
// import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthServiceService],
})
export class LoginComponent {

  formData: FormGroup | undefined;

  validPassword: boolean | undefined;

  constructor(public authservice: AuthServiceService, private routes: Router) {}

  msg = '';
  ngOnInit() {}
  check(username: string, password: string) {
    var output = this.authservice.checkusernameandpassword(username, password);
    if (output == true) {
      this.routes.navigate(['/home']);
    } else {
      this.validPassword = true;
      this.msg =
        'Invalid username or password. If you are a new user, please register ';
    }
  }
}
