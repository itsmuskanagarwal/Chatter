import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public userdetail: {
    "name": string;
    "contact": string;
    "email": string;
    "password": string;
  }={"name":"", "contact":"", "email":"", "password":""}

  public getUserDetails(userdetail:{"name":string, "contact":string, "email":string, "password":string}){
      this.userdetail=userdetail;
      console.log(this.userdetail);
  }

}
