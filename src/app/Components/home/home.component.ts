import { Component, ElementRef, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { CrudService } from 'src/app/services/crud.service';
import { io } from 'socket.io-client';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('chat_messages', { static: false }) messagesRef: ElementRef | any;
  @ViewChild('textareaRef') textareaRef: ElementRef | any;
  @ViewChild('badge') badge: ElementRef | any;

  private socket: any;
  public messages:
    | [{ message: string; timestamp: Date; sender: string }]
    | any = [];
  public message: string = '';
  public chatID: string = '';
  selected: any;
  chatCount: any;

  user: any;
  // USERS:user[]=[];
  USERS: [
    {
      name: string | null;
      contact: string;
      email: string;
      password: string;
      displayname: string;
      count: number;
    }
  ] = [
    {
      name: '',
      contact: '',
      email: '',
      password: '',
      displayname: '',
      count: 0,
    },
  ];

  tempUSERS: [
    {
      name: string | null;
      contact: string;
      email: string;
      password: string;
      displayname: string;
      count: number;
    }
  ] = [
    {
      name: '',
      contact: '',
      email: '',
      password: '',
      displayname: '',
      count: 0,
    },
  ];



  currentUser: any;
  selectedUser: any;

  onlineUsers: [] | any;
  messageCounts: { sender: string; count: number }[] = [];

  // isclicked : boolean = false

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
    private crudService: CrudService,
    private socketService:SocketService,
  ) {}

  ngOnDestroy() {
    // this.socket.connect();
  }

  ngOnInit(): void {
    // this.socketService.connect();
    // this.socket = io('http://localhost:3000',{reconnection: true});


    this.user = JSON.parse(localStorage.getItem('myData') as string);
    this.currentUser = this.user;
    this.selectedUser = '';

    window.addEventListener('load', () => {
      this.socketService.connect();
      this.socketService.reconnect(this.currentUser.email);
    // // this.socket.emit("onlineUsers",this.currentUser.email)
    // // this.socket.emit("reconnection",this.currentUser.email)
    // console.log('reconnected to server');
    });

    //listening to the one-on-one online conversations
    this.socketService.getMessage().subscribe((data)=>{
      console.log(data);
      setTimeout(() => {
        this.messages.push({
          message: data[3],
          timestamp: Date.now(),
          sender: data[2],
        });
      }, 100);

      this.scrollToBottom();

      console.log(this.messages);
    });
    // this.socket.on('message', (data: any) => {
    // console.log(data);

    //   setTimeout(() => {
    //     this.messages.push({
    //       message: data[3],
    //       timestamp: Date.now(),
    //       sender: data[2],
    //     });
    //   }, 100);

    //   this.scrollToBottom();

    //   console.log(this.messages);
    // });

    // setTimeout(() => {
      this.socketService.getonlineUsers().subscribe((data)=>{
        console.log('socket res: ', data);
        this.onlineUsers = data;
        console.log('Online Users: ', this.onlineUsers);
      })
      // this.socket.on('onlineSockets', (data: any) => {
      //   console.log('socket res: ', data);
      //   this.onlineUsers = data;
      //   console.log('Online Users: ', this.onlineUsers);
      // });
    // }, 1000);

    //fetching all registered users
    this.crudService.getUsers().subscribe((res) => {
      this.tempUSERS = res;
      setTimeout(() => {
        for (let user in this.tempUSERS) {
          // console.log(this.USERS[user]);
          if (this.tempUSERS[user].email === this.currentUser.email) {
            this.tempUSERS.splice(parseInt(user), 1);
          }
        }
        this.USERS = this.tempUSERS
        console.log(this.USERS);

        for (let user in this.USERS) {
          console.log(this.USERS[user].email);
          this.crudService
            .getChatCount(this.currentUser.email, this.USERS[user].email)
            .subscribe((res) => {
              console.log(res);
              this.USERS[user].count = res;
              // console.log(typeof this.USERS[user].count);
            });
        }
      }, 1000);
    });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.textareaRef.nativeElement.focus();
      this.messagesRef.nativeElement.scrollTop =
        this.messagesRef.nativeElement.scrollHeight;
    }, 100);
  }

  //when a particular user is selected
  selectUserHandler(email: string): void {
    this.selected = email;
    this.messages = []; //empty the msgs array

    this.crudService
    .updateStatus(this.currentUser.email, this.selected)
    .subscribe((res) => {
      console.log('update status API call : ' + res);
      for(let user in this.USERS){

        if(this.USERS[user].email == this.selected){
          this.USERS[user].count = 0;
        }
      }
    });


    //assigning the selectedUser with the complete details
    this.selectedUser = this.USERS.find((user) => user.email === email);
    console.log(this.currentUser);
    console.log(this.selectedUser.name);

    //checking whether there is someone logged in or not
    if (localStorage.getItem('myData')) {
      //retrieving all the messages of the current user and selected user
      this.crudService
        .getAllMessages(this.currentUser.email, this.selectedUser.email)
        .subscribe((res) => {
          console.log(res);

          if (res._id) {
            this.chatID = res._id;
            console.log('Chat ID: ' + this.chatID);
          } else {
            //mapping the json res object into an array
            const array = res.map((obj: any) => Object.assign({}, obj));
            console.log(array);

            //providing a unique Chat id for the both the users
            this.chatID = array[0]._id;
            console.log('Chat ID: ' + this.chatID);
          }

          //mapping users in a single room
          this.socketService.joinRoom(this.chatID);
          // this.socket.emit('join-room', this.chatID);

          //pushing all the messages of both the users into the messages array
          for (let i = 0; i < res.length; i++) {
            const msgs = res[i].messages;
            for (let j = 0; j < msgs.length; j++) {
              this.messages.push(msgs[j]);
            }
          }
          this.scrollToBottom();
          console.log('All messages: ', this.messages);
        });
    }

    // this.scrollToBottom();
    // return this.selectedUser;
  }

  public sendMessage(message: string): void {
    if (message !== '') {
      if (message.match(/([\<])([^\>]{1,})*([\>])/i)) {
        alert('only text message can be sent');
      } else {
        console.log('working');
        console.log(this.currentUser.name);
        console.log(this.selectedUser.name);

        //send the message to other socket
        this.socketService.sendMessage([
          this.chatID,
          this.selectedUser.email,
          this.currentUser.email,
          this.message.trim(),
        ])
        // this.socket.emit('message', [
        //   this.chatID,
        //   this.selectedUser.email,
        //   this.currentUser.email,
        //   this.message.trim(),
        // ]);

        this.message = '';
      }
    }
  }

  // findChatCount(email: string): string {
  //   this.crudService
  //     .getChatCount(this.currentUser.email, email)
  //     .subscribe((res) => {
  //       this.chatCount = res;
  //     });
  //   return this.chatCount;
  // }
}
