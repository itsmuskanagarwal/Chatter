import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;

  constructor() { }

  public connect(): void {
    this.socket = io('http://localhost:3000');
  }

  public sendMessage(data: any): void {
    this.socket.emit("message", data);
  }

  public joinRoom(chatID: any): void {
    this.socket.emit("join-room", chatID);
  }

  public addonlineUser(email: string): void {
    this.socket.emit("onlineSockets", email);
  }

  public reconnect(email: string): void {
    this.socket.emit("reconnection", email);
  }

  public getMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("message", (data: any) => {
        observer.next(data);
      });
    });
  }

  public getonlineUsers():Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("onlineSockets", (data: any) => {
        observer.next(data);
      });
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}
