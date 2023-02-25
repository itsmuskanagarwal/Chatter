import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private storage: StorageService,
    private crudService: CrudService,
    private http: HttpClient
  ) {}

  LoggedIn: boolean | any;
  private baseUrl = this.crudService.REST_API;

  isLoggedIn() {
    const cookieName = 'session_id';
    const cookieValue = this.getCookie(cookieName);
    return cookieValue !== null;
  }

  private getCookie(name: string): string | null {
    // Get the value of a cookie by name
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
}
