import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { User } from '../user/models/user.model';

const AUTH_URL = 'api/users';

// let users = JSON.parse(localStorage.getItem('users')) || []

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  User = [];

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // POST : Create a new user
  createUserAccount(
    username: string,
    password: string,
    email: string
  ): Observable<any> {
    const url = `${AUTH_URL}/register/`;
    const newUser = {
      username: '',
      password: '',
      email: '',
    };
    return this.http.post(url, newUser);
  }

  // POST : Check user is authenticated or not
  userlogin(username: string, password: string): Observable<any> {
    const url = `${AUTH_URL}/login/`;
    return this.http.post(url, { username, password }).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(<any>user);
        return user;
      })
    );
  }

  userlogout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User());
  }
}
