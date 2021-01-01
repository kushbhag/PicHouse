import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiPath: string;
  user: User;
  accessToken: string;
  refreshToken: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.apiPath = "https://image-repository-kush.herokuapp.com";
    //this.apiPath = "http://localhost:3000";
    if (this.loggedIn()) {
      const u = JSON.parse(localStorage.getItem('user'));
      this.user = new User();
      this.user.firstName = u.user.firstName;
      this.user.lastName = u.user.lastName;
      this.user._id = u.user._id;
    }
  }

  submitUser(user: User): Observable<any> {
    return this.http.post(this.apiPath + "/auth", JSON.stringify(user),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(this.apiPath + "/auth/login", JSON.stringify(user),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  refreshUser(): Observable<any> {
    return this.http.post<any>(this.apiPath + "/auth/token", JSON.stringify({ refreshToken: this.refreshToken}),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(this.apiPath + "/user/" + id);
  }

  loggedIn() {
    return !!localStorage.getItem('user');
  }

  logOut() {
    localStorage.removeItem('user');
    this.http.delete<any>(this.apiPath+ "/auth/logout/" + this.refreshToken,
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).subscribe(mes => {
      this.user = null;
      this.accessToken = undefined;
      this.refreshToken = undefined;
      this.router.navigate(['home']);
    }, err => {
      console.log("An error occurred trying to log out");
    })
  }

  addUser(user: User, accessToken: string, refreshToken: string) {
    localStorage.removeItem('user');
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    //console.log(accessToken);
    localStorage.setItem('user', JSON.stringify({
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken
    }));
  }

}
