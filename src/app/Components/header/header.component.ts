import { Component
 } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  username: any;

  constructor(private serviceHeader: StorageService) {}
 

  ngDoCheck() {
    if (
      this.serviceHeader.User.name != '' &&
      this.serviceHeader.User.name != null
    ) {
      this.username = 'Welcome ' + this.serviceHeader.User.displayname;
    }
  }

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
