import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Book } from 'src/app/book/models/book.model';
import { catchError, retry } from 'rxjs/operators';

const AUTH_URL = 'api/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  searchTerm = '';

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `backend returned code ${error.status} ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user friendly error message.
    return throwError('Something  went wrong please try again ');
  }

  bookList(): Observable<any> {
    /* Get a list of all the books */
    const url = `${AUTH_URL}/book-list/`;
    return this.http.get(url);
  }

  bookCreate(formData: any): Observable<any> {
    /* Create a new Book */
    const url = `${AUTH_URL}/create/`;
    return this.http.post(url, formData);
    // .pipe(
    //   retry(3), // retry a failed request up to 3 time
    //   catchError(this.handleError)
    // ); // then handle the error;
  }

  bookUpdate(id: number, book: any): Observable<any> {
    /* Update a book */
    const url = `${AUTH_URL}/update/${id}/`;
    return this.http.put(url, book);
  }

  bookDelete(id: number): Observable<any> {
    /* Delete a book */
    const url = `${AUTH_URL}/delete/${id}/`;
    return this.http.delete(url);
  }

  bookDetail(id: number): Observable<any> {
    /*  Get a detail of the book */
    const url = `${AUTH_URL}/detail/${id}/`;
    return this.http.get(url);
  }

  searchBook(): Observable<any> {
    const url = `${AUTH_URL}/searchbook/` + this.searchTerm;
    return this.http.get(url);
  }
}
