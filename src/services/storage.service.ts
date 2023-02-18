import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  data:any = []

  constructor(private crudService: CrudService) { }

  
}
