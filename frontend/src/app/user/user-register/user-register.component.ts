import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { User } from 'src/app/user/models/user.model';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  
  model: any = {};
  username = '';
  email = '';
  password = '';
  showConfirmation = false;
  form = '';
  user = User;

  errors = {
    username: null,
    password: null,
    invalidEmail: null,
    emailNotExist: null,
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmitAccount() {
    this.authService
      .createUserAccount(this.username, this.password, this.email)
      .subscribe(
        (data) => {
          this.username = '';
          this.password = '';
          this.email = '';
          console.log('u', data);
          this.showConfirmation = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  // }
  // }
}
