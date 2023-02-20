import { Injectable } from '@angular/core';
import { user } from 'src/modules/user';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // Node/Express API
  REST_API = 'http://localhost:3000';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  addUser(data: user): Observable<any> {
    return this.httpClient.post(this.REST_API+'/add-user', data, {responseType: 'text'})
    .pipe(
      catchError(error => {
        // Handle the error here, for example:
        console.error('Error adding user', error);
        return throwError(() => new Error('Error adding user'));
      })
    );

  }

  // Get all users
  verifyUser(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpClient.post(this.REST_API+'/login', body).pipe(
      catchError(error => {
        // Handle the error here, for example:
        console.error('Error fetching user', error);
        return throwError(() => new Error('Error fetching user'));
      })
    );
  }

  // Get single user
  GetUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  updateUser(data:any): Observable<any> {
    return this.httpClient.put(this.REST_API+'/update-user', data)
    .pipe(
      catchError(error => {
        // Handle the error here, for example:
        console.error('Error updating user', error);
        return throwError(() => new Error('Error updating user'));
      })
    );
  }




  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
