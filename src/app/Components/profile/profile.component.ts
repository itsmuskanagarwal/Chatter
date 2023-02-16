import { Component, OnInit, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/services/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {

  userdetails: any;
  getId: any;
  updateForm: FormGroup  | any;

  constructor(
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
    
  ) {}

 
  
  save(username: any, userContact: any, userEmail: any, display: any) {
    if (
      username != '' ||
      userContact != '' ||
      userEmail != '' ||
      display != ''
    ) {
      
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');

      this.crudService.GetUser(this.getId).subscribe(res => {
        this.updateForm.setValue({
          name: res['name'],
          price: res['price'],
          description: res['description']
        });
      });
   
      this.updateForm = this.formBuilder.group({
        name: [''],
        price: [''],
        description: ['']
      })

      this._snackBar.open(
        'Hello ' + username + ', Details Updated successfully!!',
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
