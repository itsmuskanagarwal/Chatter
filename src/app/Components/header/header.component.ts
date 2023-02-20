
import { Component } from '@angular/core';

import { StorageService } from '../../../services/storage.service';
import { AuthServiceService } from 'src/services/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: any;
  isLoggedIn = false;


  constructor(
    private serviceHeader: StorageService, 
    private authService: AuthServiceService) {}
 
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }


  ngDoCheck() {
    if (
      this.serviceHeader.data.name != '' &&
      this.serviceHeader.data.name != null
    ) {
      this.username = 'Welcome ' + this.serviceHeader.data.displayname;
    }
  }

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }


  login() {
      this.isLoggedIn = this.authService.LoggedIn;
    };
  

  logout() {
    
    this.isLoggedIn = this.authService.LoggedIn;
  };
  
}
