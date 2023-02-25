import { Component } from '@angular/core';
import { ChatService } from 'src/services/chat.service';
import { StorageService } from 'src/services/storage.service';
import { CrudService } from 'src/services/crud.service';
import { user } from 'src/modules/user';
import { io } from 'socket.io-client';


interface Message {
  message: string;
  sender: string;
  receiver: string;
  _id: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private socket: any;
  public messages: [{ message: string; timestamp: Date; sender: string; }] | any = [];
  public message: string = '';
  public chatID: string = '';

  user: any;
  USERS: user[] = [];
  emailID: string | any;
  timestamp = new Date().toLocaleTimeString();

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
  newMsg: { message: any; timestamp: Date; sender: any; } | any;

  //function for generating random profile images
  getRandomImg(): string {
    const randomImg = this.Img[Math.floor(Math.random() * this.Img.length)];
    return randomImg;
  }

  constructor(
    private chatService: ChatService,
    private storage: StorageService,
    private crudService: CrudService
  ) {}

  ngDoCheck(){

  }

  ngOnDestroy(){
    this.socket.disconnect();
  }

  ngOnInit(): void {
    this.user = this.storage.data;
    this.currentUser = this.user;
    this.selectedUser = '';

    this.socket = io('http://localhost:3000');

    // Listen for incoming messages
    this.socket.on('message', (data: any) => {
      this.newMsg={message:data[3],timestamp:Date.now(),sender:data[2]};
      this.messages.push(this.newMsg);
      // console.log(data[0]);
      console.log(data);
    });

    //fetching all registered users
    this.crudService.getUsers().subscribe((res) => {
      this.USERS = res;
      for (let user in this.USERS) {
        if (this.USERS[user].email === this.currentUser.email) {
          this.USERS.splice(parseInt(user), 1);
        } else {
          continue;
        }
      }
      console.log(this.USERS);
    });
  }

  selectUserHandler(email: string): void {
    this.messages = [];

    this.selectedUser = this.USERS.find((user) => user.email === email);
    console.log(this.currentUser);
    console.log(this.selectedUser.name);
    this.emailID = this.selectedUser.email;

    if (this.currentUser.length !== 0) {
      this.crudService
        .getAllMessages(this.currentUser.email, this.selectedUser.email)
        .subscribe((res) => {
          console.log("Response: "+res);

          // if(res>0){
          // this.messages.push(res)
          const array = res.map((obj: any) => Object.assign({}, obj));
          console.log("array: "+array)
          this.chatID = array[0]._id;
          console.log("Chat ID: "+this.chatID);


          // if (res && res.length > 0) {
            // for (let obj in array) {
            //   const arr=array[obj].messages[obj];
            //   console.log(obj);
            //   this.messages.push(array[obj].messages[obj]);

            // }
            for (let i = 0; i < array.length; i++) {
              const msgs = array[i].messages;
              for (let j = 0; j < msgs.length; j++) {
                this.messages.push(msgs[j]);
              }
            }

            console.log('All messages: ', this.messages);
          // }
          // }
        });
    }

    // this.crudService.getNewMessages(this.currentUser.name,this.selectedUser.name).subscribe((res)=>{
    //   console.log(res);
    //   // this.messages.push(res.message);
    //   // // console.log("new",this.messages)
    // });
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
    this.socket.emit('join-room',this.chatID);

    // this.crudService.sendMessages(this.currentUser.name,this.selectedUser.name,message).subscribe((res)=>{
    //   console.log(res);
    // })
    // if (this.message.trim()) {
    // }
    this.message = '';
  }
}
