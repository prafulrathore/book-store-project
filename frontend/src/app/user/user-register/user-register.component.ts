import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  model: any = {};
  username: '';
  email: '';
  password: '';
  showConfirmation = false;
  form = '';
  user: any = {};
  // requiredForm: FormGroup;
  // error: string = null;
  errors = {
    username: null,
    password: null,
    invalidEmail: null,
    emailNotExist: null,
  };

  constructor(
    private router: Router,
    private authService: AuthService // private fb: FormGroup
  ) {
    (this.username = ''), (this.email = ''), (this.password = '');
    this.user = {};
  }

  ngOnInit(): void {}

  onSubmitAccount() {
    this.authService.createUserAccount(this.username, this.password, this.email).subscribe(
      (data) => {
        this.username = ''
        this.password = ''
        this.email = ''
        // this.user = data;
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
