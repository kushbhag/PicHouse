import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = "https://image-repository-kush.herokuapp.com";
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
}
