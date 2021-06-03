import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/book/models/book.model';
@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})
export class BookAddComponent implements OnInit {
  book: Book;
  showConfirmation = false;
  // fileToUpload: File = null;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  //   handleFileInput(files: FileList) {
  //     this.fileToUpload = files.item(0);
  // }
  createBook() {
    this.bookService.bookCreate(this.book).subscribe(
      (data) => {
        this.book = data;
        this.showConfirmation = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
