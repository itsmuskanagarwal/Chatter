import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private storage: StorageService) {}

  checkusernameandpassword(uname: string, pwd: string) {
    if (
      uname == this.storage.User.name &&
      pwd == this.storage.User.password
    ) {
      localStorage.setItem('username', this.storage.User.name); //will add that key to the given Storage object
      return true;
    } else {
      return false;
    }
  }
}
