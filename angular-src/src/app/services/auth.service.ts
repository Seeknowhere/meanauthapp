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

  getProfile(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/users/profile', {headers: headers})
  }

  storeUserData(token,user){
    localStorage.setItem('id_token', token); //when jwt validates the token
    localStorage.setItem('user', JSON.stringify(user)); //localstorage only accepts String //user is an object
    console.log(user);
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;

  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
