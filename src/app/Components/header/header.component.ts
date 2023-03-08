import { Component, OnInit, NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../../services/storage.service';
import { AuthServiceService } from 'src/app/services/authservice.service';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  username: any;
  private socket:any;

  constructor(
    private serviceHeader: StorageService,
    private authService: AuthServiceService,
    private cookieService: CookieService,
    private storage: StorageService,
    private router: Router,
    private ngZone: NgZone
    ) {

      console.log(localStorage.getItem('isLoggedIn'))
    }

    logout() {
      // remove user's data from localStorage and navigate to landing page
      this.socket.disconnect();
      localStorage.removeItem('myData');
      localStorage.removeItem('isLoggedIn');

      this.ngZone.run(() => this.router.navigateByUrl('/landing'));
    }


    isLoggedIn: boolean | any;

    ngOnDestroy(){
  }

  ngOnInit(){
    this.socket = io('http://localhost:3000');

    // window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  ngDoCheck() {

    if (localStorage.getItem('isLoggedIn')) {
      const data = JSON.parse(localStorage.getItem('myData') as string);
      this.username = 'Welcome ' + data.name;

      this.isLoggedIn = true;
    } else {
      this.username = '';
      this.isLoggedIn = false;

      // console.log(localStorage.getItem('myData'))
      // console.log(localStorage.getItem('isLoggedIn'))
    }
  }

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
