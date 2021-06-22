import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

const AUTH_URL = 'api/book';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})
export class BookAddComponent implements OnInit {
  // book!: Book;

  selectedFile: File = null as any;
  File: File = null as any;
  url: any;
  form!: FormGroup;
  str!: Array<string>;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private http: HttpClient,
    // private router: Router,
    private route: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.selectedFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onPdfFileChange(event: any) {
    this.File = <File>event.target.files[0];
    // var reader = new FileReader();
    // reader.onload = (event: any) => {
    //   this.url = event.target.result;
    // };
    // reader.readAsDataURL(event.target.files[0]);
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      document: ['', Validators.required],
      pdf: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.max(200), Validators.required]],
    });
  }
  createBook() {
    debugger;
    const formData = new FormData();
    formData.append('title', this.form.value.title);
    // const authors = this.form.value.author;
    // const arr = authors.split(/\s+/);
    // console.log(arr, 'sgrg');
    // formData.append('author', arr);
    formData.append('author', this.form.value.author);
    formData.append('document', this.selectedFile, this.selectedFile.name);
    formData.append('pdf', this.File, this.File.name);
    formData.append('price', this.form.value.price);

    this.bookService.bookCreate(formData).subscribe(
      (res) => {
        console.log(res);
        alert('Uploaded Successfully.');
      },
      (error) => {
        console.log(error);
      }
    );
    // this.route.navigateByUrl('');
  }
}
