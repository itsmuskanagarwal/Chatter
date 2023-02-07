import { Component } from '@angular/core';
import { Contact } from '../modules/contact';
import { CONTACT } from '../modules/mockup-contacts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  usernameinhome: string = '';

  Contacts = CONTACT;
}
