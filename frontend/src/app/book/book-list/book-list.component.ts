import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/book/models/book.model';
import { Observable, Subscription, interval } from 'rxjs';

const BOOKS = [];

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: any;
  constructor(
    private bookService: BookService
  ) // private updateSubscription: Subscription
  {}

  ngOnInit(): void {
    // this.updateSubscription = interval(3000).subscribe(
    //   (val) => {
    this.getBookList();
    // });
  }

  getBookList() {
    this.bookService.bookList().subscribe(
      (data) => {
        this.books = data;
        console.log('Book-list', data);
        for (let i = 0; i < data.length; i++) {
          let author = this.books[i].author[i];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
