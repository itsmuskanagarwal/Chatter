import { Component } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private service_header:StorageService){

  }

  userdetailsinheader=this.service_header.setUserDetails()?.name;
  usernameinheader=this.userdetailsinheader;

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
