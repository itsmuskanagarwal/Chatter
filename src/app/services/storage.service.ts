import { Injectable } from '@angular/core';
import { user } from '../modules/register_user';
import { userProfile } from '../modules/profile_user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public userdetail: user = {
    name: null,
    contact: '',
    email: '',
    password: '',
  };

  public userProfileDetail: userProfile = {
    name: '',
    contact: '',
    email: '',
    displayname: '',
  };

  public getUserDetails(userdetail: user) {
    this.userdetail = userdetail;
  }

  public getUserProfileDetails(userprofiledetail: userProfile) {
    this.userProfileDetail = userprofiledetail;
  }
}
