import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alertMessage: string;
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    const user = new User();

    user.username = this.signUpForm.get('username').value;
    user.password = this.signUpForm.get('password').value;
    this.userService.loginUser(user).subscribe(v => {
      console.log(v);
    }, err => {
      if (err.status === 401) {
         this.alertMessage = "Invalid Password";
      } else if (err.status === 404) {
        this.alertMessage = "No user found with that user name";
      }
    });
  }

}
