import { Component } from '@angular/core';
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
}
