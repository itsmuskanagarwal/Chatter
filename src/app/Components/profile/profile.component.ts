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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  getId: any;
  updateForm: FormGroup | any;

  constructor(
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private storage: StorageService
  ) {
    this.updateForm = formBuilder.group({
      username: '',
      userContact: '',
      userEmail: '',
      display: '',
    });
  }

  ngOnInit() {
    console.log(this.storage.data);
    this.updateForm.setValue({
      username: this.storage.data.name,
      userContact: this.storage.data.contact,
      userEmail: this.storage.data.email,
      display: this.storage.data.displayname,
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

  url: any;
  onSelectFile(event: any) {
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]); // read file as data url
    //   reader.onload = (event) => { // called once readAsDataURL is completed
    //     this.url=event.target?.DONE;
    //   }
    // }
  }
}
