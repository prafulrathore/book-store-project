import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/book/models/book.model';
const BOOKS = [];

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: any;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBookList();
  }

  getBookList() {
    this.bookService.bookList().subscribe(
      (data) => {
        this.books = data;
        console.log('Book-list', data);
        for (let i = 0; i < data.length; i++) {
          let author = this.books[i].author;
          let username = this.books[i].author[0]?.username;
          if (typeof this.books[i].author[0]?.username === 'undefined') {
            console.log('author is undefined');
          }
          console.log('author', username);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
