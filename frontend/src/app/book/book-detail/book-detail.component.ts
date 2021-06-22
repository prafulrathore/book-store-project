import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Location } from '@angular/common';
import { Book } from 'src/app/book/models/book.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  items: any;
  book!: Book;
  id!: number;
  img: any;
  authors = [];
  update = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getBookDetail();
    // this.getBookDelete();
    // this.getBookUpdate();
  }

  getBookDetail() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.bookDetail(id).subscribe(
      (data) => {
        this.items = data;
        this.authors = data.author;
        console.log('detail', data);
        let objectURL = 'data:image/jpeg;base64,' + data.document;
        this.img = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
        let fileURL = 'data:application/pdf;base64,' + data.pdf;
        this.img = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
        console.log(this.img);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBookDelete(id: any) {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.bookDelete(id).subscribe();
    this.router.navigateByUrl('');
  }

  getBookUpdate(id : number, book: any) {
    this.update = !this.update;
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.bookUpdate(id , book).subscribe((data) => {
      this.book = data;
      console.log('hh', this.book);
    });
  }

  home() {
    this.router.navigateByUrl('');
  }
}
