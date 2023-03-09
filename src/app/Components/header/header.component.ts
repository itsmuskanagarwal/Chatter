import { Component, OnInit, NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../../services/storage.service';
import { AuthServiceService } from 'src/app/services/authservice.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

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
    private ngZone: NgZone,
    private socketService: SocketService
  ) {
    console.log(localStorage.getItem('isLoggedIn'));
  }

  logout() {
    // remove user's data from localStorage and navigate to landing page
    localStorage.removeItem('myData');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('socketID');
    setTimeout(() => {
      this.socketService.disconnect();
    });
    this.ngZone.run(() => this.router.navigateByUrl('/landing'));
  }

  isLoggedIn: boolean | any;

  ngOnInit() {
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
