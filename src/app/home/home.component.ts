import { Component } from '@angular/core';
import { Contact } from '../contact';
import { CONTACT } from '../mockup_contacts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  usernameinhome:string="";

  Contacts = CONTACT;
}
