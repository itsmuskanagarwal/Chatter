import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { CrudService } from 'src/app/services/crud.service';
import { user } from 'src/app/models/user';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy, OnInit {
  private socket: any;
  public messages:
    | [{ message: string; timestamp: Date; sender: string }]
    | any = [];
  public message: string = '';
  public chatID: string = '';

  user: any;
  USERS: user[] = [];

  currentUser: any;
  selectedUser: any;

  //image array for profile image
  Img = [
    'assets/p5.webp',
    'assets/p1.avif',
    'assets/p3.png',
    'assets/p4.avif',
    'assets/p2.png',
  ];
  newMsg: { message: any; timestamp: Date; sender: any } | any;

  //function for generating random profile images
  getRandomImg(): string {
    const randomImg = this.Img[Math.floor(Math.random() * this.Img.length)];
    return randomImg;
  }

  constructor(
    private storage: StorageService,
    private crudService: CrudService
  ) {}

  ngDoCheck() {}

  ngOnDestroy() {
    this.socket.disconnect();
  }

  ngOnInit(): void {
    this.user = this.storage.data;
    this.currentUser = this.user;
    this.selectedUser = '';

    this.socket = io('http://localhost:3000');

    // Listen for incoming messages and adding it to the messages array
    this.socket.on('message', (data: any) => {
      //storing the incoming msg in a variable temp
      this.newMsg = {
        message: data[3],
        timestamp: Date.now(),
        sender: data[2],
      };
      this.messages.push(this.newMsg);
      console.log(data);
    });

    //fetching all registered users
    this.crudService.getUsers().subscribe((res) => {
      this.USERS = res;
      for (let user in this.USERS) {
        //removing the logged in user from the chatting list
        if (this.USERS[user].email === this.currentUser.email) {
          this.USERS.splice(parseInt(user), 1);
        } else {
          continue;
        }
      }
      console.log(this.USERS);
    });
  }

  //when a particular user is selected
  selectUserHandler(email: string): void {
    this.messages = []; //empty the msgs array

    //assigning the selectedUser with the complete details
    this.selectedUser = this.USERS.find((user) => user.email === email);
    console.log(this.currentUser);
    console.log(this.selectedUser.name);

    //checking whether there is someone logged in or not
    if (this.currentUser.length !== 0) {

      //retrieving all the messages of the current user and selected user
      this.crudService
        .getAllMessages(this.currentUser.email, this.selectedUser.email)
        .subscribe((res) => {
          console.log('Response: ' + res);
          console.log("OBJID", this.chatID);



          //mapping the json res object into an array
          const array = res.map((obj: any) => Object.assign({}, obj));
          console.log('array: ' + array);

          //providing a unique Chat id for the both the users
          this.chatID = array[0]._id;
          console.log('Chat ID: ' + this.chatID);

          
          this.socket.emit('join-room', this.chatID);

          //pushing all the messages of both the users into the messages array
          for (let i = 0; i < array.length; i++) {
            const msgs = array[i].messages;
            for (let j = 0; j < msgs.length; j++) {
              this.messages.push(msgs[j]);
            }
          }
          console.log('All messages: ', this.messages);
        });
    }
  }

  public sendMessage(message: string): void {
    console.log('working');
    console.log(this.currentUser.name);
    console.log(this.selectedUser.name);

    //send the message to other socket
    this.socket.emit('message', [
      this.chatID,
      this.selectedUser.email,
      this.currentUser.email,
      this.message.trim(),
    ]);

    //mapping users in a single room

    // this.newMsg = {
    //   message: message,
    //   timestamp: Date.now(),
    //   sender: this.currentUser.email,
    // };
    // this.messages.push(this.newMsg);

    this.message = '';
  }
}
