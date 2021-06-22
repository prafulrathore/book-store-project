import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from '../app/user/user-login/user-login.component';
import { BookAddComponent } from './book/book-add/book-add.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import { UserLogoutComponent } from './user/user-logout/user-logout.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'logout', component: UserLogoutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'create', component: BookAddComponent },
  { path: 'detail/:id', component: BookDetailComponent },
  { path: 'delete/:id', component: BookDetailComponent },
  { path: 'update/:id', component: BookDetailComponent },
  { path: 'searchbook/:string', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
