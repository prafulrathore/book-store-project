import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // (this.username = ''), (this.password = '');
    this.loginForm();
  }
  // username = '';
  // password = '';
  showConfirmation = false;
  form!: FormGroup;

  ngOnInit(): void {}

  loginForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService
      .userlogin(this.form.value.username, this.form.value.password)
      .subscribe(
        (data) => {
          // navigate to home
          this.router.navigateByUrl('');
          this.showConfirmation = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
