import { Component, OnInit, NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { StorageService } from '../../../services/storage.service';
import { AuthServiceService } from 'src/services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  username: any;


  constructor(
    private serviceHeader: StorageService, 
    private authService: AuthServiceService,
    private cookieService: CookieService,
    private storage: StorageService,
    private router: Router,
    private ngZone: NgZone) {}
 
  
  logout() {
    // delete isLoggedIn cookie
    this.cookieService.delete('isLoggedIn');
    this.storage.isLoggedIn = false;
    this.ngZone.run(() => this.router.navigateByUrl('/landing'));

  }

  isLoggedIn : boolean | any;

  ngDoCheck() {
    if (this.isLoggedIn) {
      this.username = 'Welcome ' + this.storage.data.name;
    }
     else{
      this.username=""
     } 

    // check if user is already logged in
    if (this.cookieService.get('isLoggedIn') === 'true') {
      this.storage.isLoggedIn = true;
    }
    this.isLoggedIn = this.storage.isLoggedIn;
  }

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
