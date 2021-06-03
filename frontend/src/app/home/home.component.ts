import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import { User } from 'src/app/user/models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];
  constructor(
    private bookservice: BookService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.currentUser = this.authService.currentUserValue;
    console.log('User', this.currentUser);
  }
  ngOnInit(): void {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService
      .getUsers()
      .pipe(first())
      .subscribe((users) => (this.users = users));
  }
}
