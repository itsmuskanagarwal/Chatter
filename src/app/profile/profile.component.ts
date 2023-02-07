import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { userProfile } from '../modules/profile_user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  public profiledetails!: userProfile;

  userdetails: any;

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private profile_service: StorageService
  ) {}

  save(username: any, usercontact: any, useremail: any, display: any) {
    if (
      username != '' ||
      usercontact != '' ||
      useremail != '' ||
      display != ''
    ) {
      this._router.navigate(['landing']);
      this.profiledetails = {
        name: username,
        contact: usercontact,
        email: useremail,
        displayname: display,
      };
      this.profile_service.getUserProfileDetails(this.profiledetails);
      this._snackBar.open(
        'Hello ' + username + ', Details Updated successfully!!',
        'OK',
        {
          duration: 5000,
        }
      );
    } else {
      this._snackBar.open('Something went wrong', 'OK', {
        duration: 5000,
      });
    }
  }

  url: any;
  onSelectFile(event: any) {
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]); // read file as data url
    //   reader.onload = (event) => { // called once readAsDataURL is completed
    //     this.url=event.target?.DONE;
    //   }
    // }
  }

  ngDoCheck() {
    this.userdetails = this.profile_service.userdetail;
  }
}
