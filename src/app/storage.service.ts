import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public userdetail: {
    "name": string|null;
    "contact": string;
    "email": string;
    "password": string;
  }={"name":null, "contact":"", "email":"", "password":""}

  public userProfileDetail: {
    "name": string;
    "contact": string;
    "email": string;
    "displayname": string;
  }={"name":"", "contact":"", "email":"", "displayname":""}

  public getUserDetails(userdetail:{"name":string, "contact":string, "email":string, "password":string}){
      this.userdetail=userdetail;
  }

  public getUserProfileDetails(userprofiledetail:{"name":string, "contact":string, "email":string, "displayname":string}){
    this.userProfileDetail=userprofiledetail;
}

}
