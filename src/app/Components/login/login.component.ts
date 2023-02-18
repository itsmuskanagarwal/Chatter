import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/authservice.service';
import { CrudService } from 'src/services/crud.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthServiceService],
})
export class LoginComponent {
  validPassword: boolean | undefined;
  data: any = [];

  constructor(
    public authservice: AuthServiceService,
    private routes: Router,
    private crudService: CrudService,
    private storage:StorageService,
    private ngZone: NgZone,
  ) {}

  msg = '';

  ngOnInit() {}
  check(uname: string, pwd: string) {

    this.crudService.getUsers(uname,pwd).subscribe((res) => {
      this.data=res;
      console.log(res);
      if(this.data.email==uname){
        this.ngZone.run(() => this.routes.navigateByUrl('/home'));
      }else {
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
