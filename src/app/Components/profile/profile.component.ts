import { Component, OnInit, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  getId: any;
  updateForm: FormGroup | any;
  public imageUrl: string = '';
  isClicked: boolean = false;

  img = [
    "../assets/img1.jpg",
    "../assets/img2.jpg",
    "../assets/img3.jpg",
    "../assets/img4.jpg",
    "../assets/img5.jpg",
  ]

  constructor(
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private storage: StorageService,
    private http: HttpClient
  ) {
    this.updateForm = formBuilder.group({
      username: '',
      userContact: '',
      userEmail: '',
      display: '',
    });

    if (localStorage.getItem('isLoggedIn') == 'true') {
      this.storage.data = JSON.parse(localStorage.getItem('myData') as string);
      this.crudService.getAvatar(this.storage.data.email).subscribe((res) => {
        this.imageUrl = res.profilePicture;
        console.log(this.imageUrl)
      });
    }
  }

  ngOnInit() {

    console.log(this.storage.data);
    this.updateForm.setValue({
      username: this.storage.data.name,
      userContact: this.storage.data.contact,
      userEmail: this.storage.data.email,
      display: this.storage.data.displayname
    });

    const avatorContainer = document.querySelector(
      '.avatar-container'
    ) as HTMLElement;
    const avatarMorebtn = document.querySelector(
      '.avatar-container-more'
    ) as HTMLElement;
    const avatarItems = document.querySelectorAll('.avatar-container-item');

    avatarMorebtn.addEventListener('click', () => {
      avatorContainer.classList.toggle('avatar-container__expanded');
    });

  }


  upload() {
    this.isClicked = true;
    console.log(this.isClicked)
  }

  selectedAvatar(imageUrl: string) {
    console.log("selectAvatar body entered")
    this.imageUrl =  imageUrl;
    this.isClicked = false;
    console.log(this.isClicked)
    this.crudService.updateAvatar(this.storage.data.email,this.imageUrl).subscribe((res) => {
      console.log(res);

    });

  }

  save(data: any) {
    if (this.updateForm.valid) {

      this.storage.data.name = data.username;
      this.storage.data.contact = data.userContact;
      this.storage.data.email = data.userEmail;
      this.storage.data.displayname = data.display;
      

      console.log(this.storage.data);

      this.crudService.updateUser(this.storage.data).subscribe((res) => {
        console.log(res);
      });


      this._snackBar.open(
        'Hello ' + data.display + ', Details Updated successfully!!',
        'OK',
        {
          duration: 5000,
        }
      );
    } else {
      this._snackBar.open('Something went wrong', 'OK', {
        duration: 5000,
      });
    }
  }
}
