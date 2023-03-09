import { Component, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.formData = this.formBuilder.group({
      username: '',
      email: '',
      contact: '',
      message: '',
    });
  }
  formData: FormGroup | any;

  onClickSubmit(data: any) {
    this.crudService.addQuery(this.formData.value).subscribe((res) => {
      console.log('Query added', res);
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
    });

    this._snackBar.open(
      'Hello ' + data.username + ', Your query is submitted !!',
      'OK',
      {
        duration: 5000,
      }
    );
  }
}
