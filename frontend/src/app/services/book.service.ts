import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/book/models/book.model';
import { Observable } from 'rxjs';
const AUTH_URL = 'api/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  //Get : Get a list of all the books
  bookList(): Observable<any> {
    const url = `${AUTH_URL}/book-list/`;
    return this.http.get(url);
  }

  // POST : Create a book
  bookCreate(book: Book): Observable<any> {
    const url = `${AUTH_URL}/create/`;
    return this.http.post(url, book);
  }

  // PUT : Update a book
  bookUpdate(id: number, book: Book): Observable<any> {
    const url = `${AUTH_URL}/update/${id}/`;
    return this.http.put(url, book);
  }

  // Delete : Delete a book
  bookDelete(id: number): Observable<any> {
    const url = `${AUTH_URL}/delete/${id}/`;
    return this.http.delete(url);
  }

  // Get : Get a detail of the book
  bookDetail(id: number): Observable<any> {
    const url = `${AUTH_URL}/detail/${id}/`;
    return this.http.get(url);
  }
}
