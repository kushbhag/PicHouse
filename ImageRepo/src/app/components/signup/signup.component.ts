import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  submit(): void {
    const user = new User();

    user.password = this.signUpForm.get('username').value;
    if (user.password !== this.signUpForm.get('confirmPassword').value) {
      return;
    }
    user.username = this.signUpForm.get('username').value;
    user.firstName = this.signUpForm.get('firstName').value;
    user.lastName = this.signUpForm.get('lastName').value;
    this.userService.submitUser(user).subscribe(v => {
      console.log(v);
    });
  }

}
