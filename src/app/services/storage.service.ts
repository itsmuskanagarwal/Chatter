import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  data: any = [];
  isLoggedIn: boolean = false;

  constructor(private crudService: CrudService) {}

}
