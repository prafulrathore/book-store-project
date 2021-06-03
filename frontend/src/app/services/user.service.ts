import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpHeaderResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user/models/user.model';
const AUTH_URL = 'api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  users: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const url = `${AUTH_URL}/user-list/`;
    return this.http.get(url);
  }
}
