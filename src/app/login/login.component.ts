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
  // username: any;
  // password: any;
  // formData: FormGroup | undefined;

  constructor(public authService: AuthServiceService, private routes: Router) {}

  msg = '';
  ngOnInit() {}

  check(username: string, pswd: string) {
    var output = this.authService.checkusernameandpassword(username, pswd);
    if (output == true) {
      this.routes.navigate(['/home']);
    } else {
      this.msg =
        'Invalid username or password. If you are a new user, please register  ';
      alert(this.msg);
    }
  }
}
