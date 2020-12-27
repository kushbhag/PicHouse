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

  constructor(private http: HttpClient,
              private router: Router) {
    this.apiPath = "https://image-repository-kush.herokuapp.com";
    this.apiPath = "http://localhost:3000";
    if (this.loggedIn()) {
      const u = JSON.parse(localStorage.getItem('user'));
      this.user = new User();
      this.user.firstName = u.firstName;
      this.user.lastName = u.lastName;
      this.user._id = u._id;
    }
  }

  submitUser(user: User): Observable<any> {
    return this.http.post(this.apiPath + "/user", JSON.stringify(user),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiPath + "/user/login", JSON.stringify(user),
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
    this.user = null;
    this.router.navigate(['home']);
  }

  addUser(user: User) {
    localStorage.removeItem('user');
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

}
