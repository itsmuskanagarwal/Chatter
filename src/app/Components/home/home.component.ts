
import { Component } from '@angular/core';
import { CONTACT } from '../../../modules/mockup-contacts';
import { ChatService } from 'src/services/chat.service';
import { StorageService } from 'src/services/storage.service';
import { CrudService } from 'src/services/crud.service';
import { user } from 'src/modules/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  Contacts = CONTACT;
  user:any;
  USERS:user[] = [];
  public roomId: string | any;
  public messageText: string | any;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray: { roomId: string, chats: { user: string, message: string }[] }[] = [];

  public phone: string | undefined;
  public currentUser:any;
  selectedUser:any;



  constructor(private chatService:ChatService, private storage:StorageService, private crudService:CrudService){}

  ngOnInit(): void {
    this.currentUser=this.Contacts[0];
    this.selectedUser=this.currentUser;
    this.user=this.storage.data;

    //fetching all registered users
    this.crudService.getUsers().subscribe((res)=>{
      this.USERS=res;
      console.log(this.USERS);
    })

    this.chatService.getMessage()
      .subscribe((data: { user: string, room: string, message: string }) => {
        if (this.roomId) {
          setTimeout(() => {
            this.storageArray = this.chatService.getStorage();
            const storeIndex = this.storageArray
            .findIndex((storage) => storage.roomId === this.roomId);
            this.messageArray = this.storageArray[storeIndex].chats;
          }, 500);
        }
      });
  }

  selectUserHandler(id: number): void {
    this.selectedUser = this.Contacts.find((user) => user.id === id);
    console.log(this.selectedUser)
   this.roomId = this.selectedUser.roomId[this.selectedUser.id];
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    // this.storageArray = this.chatService.getStorage();
    this.join(this.currentUser.name,this.roomId);
  }

  join(username:string, roomId:string):void{
    // this.chatService.joinRoom({username,roomId});
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: this.roomId,
      message: this.messageText
    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.name,
          message: this.messageText
        }]
      };
      this.storageArray.push(updateStorage);
    }
    this.chatService.setStorage(this.storageArray);
    this.messageText = '';


  }

}
