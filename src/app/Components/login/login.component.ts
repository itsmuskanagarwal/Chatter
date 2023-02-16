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
  check() {

    this.crudService.GetUsers().subscribe(res => {
      console.log(res)
    this.data =res;});

    const output = this.authservice.checkusernameandpassword(this.data.username, this.data.password);

    if (output == true) 
    {
      this.routes.navigate(['/home']);
    } 
    else 
    {
      this.validPassword = true;
      this.msg =
        'Invalid username or password. If you are a new user, please register ';
    }
  }
}
