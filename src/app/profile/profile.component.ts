import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userdetails: any;

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private profileService: StorageService
  ) {}

  save(username: any, userContact: any, userEmail: any, display: any) {
    if (
      username != '' ||
      userContact != '' ||
      userEmail != '' ||
      display != ''
    ) {
      this._router.navigate(['landing']);

      this.profileService.userDetail.name = username;
      this.profileService.userDetail.email = userEmail;
      this.profileService.userDetail.contact = userContact;
      this.profileService.userDetail.displayname = display;

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
    this.userdetails = this.profileService.userDetail;
  }
}
