import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/authservice.service';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthServiceService],
})
export class LoginComponent {

  validPassword: boolean | undefined;
  data : any =[];
  

  constructor(
    public authservice: AuthServiceService,
    private routes: Router,
    private crudService: CrudService) {}

  msg = '';
  ngOnInit() {}
  check(uname:string,pwd:string) {

    console.log(this.data.userame);

    this.crudService.getUsers().subscribe(res => {
      console.log(res);
    });

    const output = this.authservice.checkusernameandpassword(uname, pwd);

    if (output == true)
    {
      this.routes.navigate(['/home']);
      this.authservice.LoggedIn = true;
    }
      
    else
    {
      this.authservice.LoggedIn = false;
      this.validPassword = true;
      this.msg =
        'Invalid username or password. If you are a new user, please register ';

    }
  }
}
