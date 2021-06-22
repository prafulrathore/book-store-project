import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpHeaderResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../user/models/user.model';
const AUTH_URL = 'api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(term: string): Observable<any> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${AUTH_URL}/user-list/?search=${term}`;
    return this.http.get(url);
  }
  /** Get the heroes whose name contains the search term */
  //  searchHeroes(term : string) : Observable<Hero[]> {
  //   if (!term.trim()){
  //     // if the search term is empty, returns empty array of heroes
  //     return of([]);
  //   }
  //   return this.http.get<Hero []>(`${this.heroesUrl}/?name=${term}`).pipe
  //   (tap(x => x.length ?
  //     this.log(`founded heroes matching '${term}'`):
  //     this.log(`no matching result '${term}'`)),
  //     catchError(this.handleError<Hero []>(`serachHeroes`, []))
  //     );
  // }
}
