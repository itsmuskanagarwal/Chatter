import { Component } from '@angular/core';
import { CONTACT } from '../../../modules/mockup-contacts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  Contacts = CONTACT;
}
