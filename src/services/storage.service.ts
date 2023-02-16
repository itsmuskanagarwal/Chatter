import { Injectable } from '@angular/core';
import { CrudService } from './crud.service'; 

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  User:any = []
 
  constructor(private crudService: CrudService) { }
 
  ngOnInit(): void {
    this.crudService.GetUsers().subscribe(res => {
      console.log(res)
      this.User =res;
    });    
  }
}
