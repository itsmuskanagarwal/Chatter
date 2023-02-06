import { Component } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent{

    usernameinheader:any;

    constructor(private service_header:StorageService){
    }

    ngDoCheck(){
      if(this.service_header.userdetail.name!=""){
        console.log(this.service_header.userdetail.name);
        this.usernameinheader='Welcome '+this.service_header.userProfileDetail.displayname;
      }
  }

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
