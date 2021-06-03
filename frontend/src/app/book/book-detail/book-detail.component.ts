import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Location } from '@angular/common';
import { Book } from 'src/app/book/models/book.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  items: any;
  // book: Book[];
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBookDetail();
    this.getBookDelete();
  }

  getBookDetail() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.bookDetail(id).subscribe(
      (data) => {
        this.items = data;
        console.log('detail', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBookDelete() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.bookDelete(id).subscribe();
  }

  goBack() {
    this.location.back();
  }
}
