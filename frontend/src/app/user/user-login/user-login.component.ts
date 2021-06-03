import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(private authService: AuthService) {
    (this.username = ''), (this.password = '');
  }
  username: '';
  password: '';
  showConfirmation = false;

  ngOnInit(): void {}

  login() {
    this.authService.userlogin(this.username, this.password).subscribe(
      (data) => {
        this.username;
        this.password;
        this.showConfirmation = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
