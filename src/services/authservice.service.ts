import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private storage: StorageService,private crudService: CrudService) {}

}
