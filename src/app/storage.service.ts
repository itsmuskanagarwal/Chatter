import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public userdetail:{
    "name":"",
    "contact": "",
    "email":"",
    "password":""
  } | undefined

  public getUserDetails(userdetail:{"name": "","contact": "","email":"","password":""}){
      this.userdetail=userdetail;

  }

  public setUserDetails(){
    console.log(this.userdetail);
      return this.userdetail;
  }

}
