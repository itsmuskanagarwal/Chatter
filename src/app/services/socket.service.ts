import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  constructor() {}

  //establish socket connection
  public connect(): void {
    this.socket = io('http://localhost:3000');
  }

  //reconnecting to the socket
  public reconnect(): void {
    this.socket = io('http://localhost:3000');
    this.socket.connect();
  }

  //send the message to the other socket
  public sendMessage(data: any): void {
    this.socket.emit('message', data);
  }

  //joining a chat room
  public joinRoom(chatID: any): void {
    this.socket.emit('join-room', chatID);
  }

  //adding the new logged in user to the onlineUsers array
  public addonlineUser(email: string): void {
    this.socket.emit('onlineSockets', email);
  }

  //getting the messages from other sockets
  public getMessage(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
    });
  }

  //fetching all the online users
  public getonlineUsers(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('onlineSockets', (data: any) => {
        observer.next(data);
      });
    });
  }

  //disconnecting to the socket connection
  public disconnect(): void {
    this.socket.disconnect();
  }
}
