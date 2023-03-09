import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  onlineUsers: [] | any;
  data: any = [];

  ngDoCheck() {
    if (localStorage.getItem('isLoggedIn') == 'true') {
      this.data = JSON.parse(localStorage.getItem('myData') as string);
    }
  }

  constructor(private crudService: CrudService) {}
}
