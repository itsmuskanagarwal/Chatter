import { Component, OnInit, NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../../services/storage.service';
import { AuthServiceService } from 'src/app/services/authservice.service';
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
    private ngZone: NgZone
  ) {

    console.log(localStorage.getItem('isLoggedIn'))

    }

    logout() {

      // remove user's data from localStorage and navigate to landing page
      localStorage.removeItem('myData');
      localStorage.removeItem('isLoggedIn');

      this.ngZone.run(() => this.router.navigateByUrl('/landing'));
    }

    handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const target = event.currentTarget as Window;
      if (target && target.performance && target.performance.navigation.type === PerformanceNavigation.TYPE_RELOAD) {
        this.logout();
      }
    }


  isLoggedIn: boolean | any;

  ngOnInit(){

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
