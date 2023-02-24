import { Component } from '@angular/core';
import { ChatService } from 'src/services/chat.service';
import { StorageService } from 'src/services/storage.service';
import { CrudService } from 'src/services/crud.service';
import { user } from 'src/modules/user';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user: any;
  USERS: user[] = [];
  emailID: string | any;
  messageText: string = "";
  messageArray: string[] = [];

  currentUser: {} | any;
  selectedUser: {} | any;

  
  message: string | any;
  private socket: any;
  timestamp=new Date().toLocaleTimeString();
  
  //image array for profile image
  Img = [
    'assets/p5.webp',
    'assets/p1.avif',
    'assets/p3.png',
    'assets/p4.avif',
    'assets/p2.png',
  ];

  //function for generating random profile images
  getRandomImg(): string {
    const randomImg = this.Img[Math.floor(Math.random() * this.Img.length)];
    return randomImg;
  }

  constructor(
    private chatService: ChatService,
    private storage: StorageService,
    private crudService: CrudService,
    ) {}

  ngOnInit(): void {
    this.user = this.storage.data;
    this.currentUser = this.user;
    
    this.socket = io('http://localhost:3000');

    // Listen for incoming messages
    this.socket.on('message', (data: string) => {
      this.messageArray.push(data);
    });

    //fetching all registered users
    this.crudService.getUsers().subscribe((res) => {
      this.USERS = res;
      console.log(this.USERS);

      for(let user in this.USERS){
        if(this.USERS[user].email===this.currentUser.email)
        {
          console.log(user)
          console.log(this.currentUser.email)
          console.log(this.USERS[user].email)

        this.USERS.splice(parseInt(user),1);
        console.log(this.USERS)
      }
      else
      {
        continue
        }
      }
      console.log(this.USERS);
    });
  }
    
 

  selectUserHandler(email: string): void {
    this.selectedUser = this.USERS.find((user) => user.email === email);
    console.log(this.selectedUser.name);
    this.emailID = this.selectedUser.email;

  }

  

  sendMessage() {
    console.log('working')
    this.socket.emit('message', this.message.trim());
      this.message = '';
  }
}
