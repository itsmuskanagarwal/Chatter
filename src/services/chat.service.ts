import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { StorageService } from './storage.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private storage : StorageService,
    private httpClient: HttpClient
  ) { 
  }
  
  currentUser : {} | any 
  selectedUser : {} | any

  getPreviousConversation(): void{

    

  }
}

