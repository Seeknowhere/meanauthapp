import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {
  }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-type','application/json');
    return this.http.post<any>('http://localhost:3000/users/register', user, {headers: headers})

  }//observable to register the user in the backend and send back the data eiter success true/success false

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/authenticate', user, {headers: headers})

  }
}
