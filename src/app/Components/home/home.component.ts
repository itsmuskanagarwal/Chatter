import { Component, ElementRef, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { CrudService } from 'src/app/services/crud.service';
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
  USERS: [
    {
      name: string | null;
      contact: string;
      email: string;
      password: string;
      displayname: string;
      profilePicture: string;
      count: number;
    }
  ] = [
    {
      name: '',
      contact: '',
      email: '',
      password: '',
      displayname: '',
      profilePicture: '',
      count: 0,
    },
  ];

  currentUser: any;
  selectedUser: any;

  onlineUsers: [] | any;
  messageCounts: { sender: string; count: number }[] = [];

  constructor(
    private storage: StorageService,
    private crudService: CrudService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('myData') as string);
    this.currentUser = this.user;
    this.selectedUser = '';

    //listening to window reload event
    window.addEventListener('load', () => {
      //reconnecting to the socket on reload
      this.socketService.reconnect();

      //again adding the user which got disconnected on reload
      this.socketService.addonlineUser(this.currentUser.email);
      console.log('reconnected to server');

      //fetching all the online users in the socket
      this.socketService.getonlineUsers().subscribe((data) => {
        console.log('socket res: ', data);
        this.onlineUsers = data;
        console.log('Online Users: ', this.onlineUsers);
      });
    });

    // //listening to the one-on-one online conversations
    // this.socketService.getMessage().subscribe((data) => {
    //   console.log(data);
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

    //fetching all the online users in the socket
    this.socketService.getonlineUsers().subscribe((data) => {
      console.log('socket res: ', data);
      this.onlineUsers = data;
      console.log('Online Users: ', this.onlineUsers);
    });

    //fetching all registered users
    this.crudService.getUsers().subscribe((res) => {
      setTimeout(() => {
        this.USERS = res;
        for (let user in this.USERS) {
          //removing the current user from the USERS array
          if (this.USERS[user].email === this.currentUser.email) {
            this.USERS.splice(parseInt(user), 1);
          }
        }
        console.log(this.USERS);

        //fetching chat count of the undelivered messages for all the users
        for (let user in this.USERS) {
          console.log(this.USERS[user].email);
          this.crudService
            .getChatCount(this.currentUser.email, this.USERS[user].email)
            .subscribe((res) => {
              console.log(res);
              this.USERS[user].count = res;
            });
        }
      }, 1000);
    });
  }

  //automatic scroll to the bottom of the chat interface
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

    //updating the message delivery status
    this.crudService
      .updateStatus(this.currentUser.email, this.selected)
      .subscribe((res) => {
        console.log('update status API call : ' + res);
        for (let user in this.USERS) {
          if (this.USERS[user].email == this.selected) {
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
        ]);

        this.message = '';

        //listening to the one-on-one online conversations
        this.socketService.getMessage().subscribe((data) => {
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
      }
    }
  }
}
