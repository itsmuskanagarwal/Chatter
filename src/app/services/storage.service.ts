import { Injectable } from '@angular/core';
import { user } from '../modules/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public userDetail: user = {
    name: null,
    contact: '',
    email: '',
    password: '',
    displayname: '',
  };

  public setUserDetails(userDetail: user) {
    this.userDetail = userDetail;
  }
}
