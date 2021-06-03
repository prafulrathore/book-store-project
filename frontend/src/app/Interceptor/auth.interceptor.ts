import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.token) {
        req = req.clone({
            setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
            },
        });
        }
        return next.handle(req);
    }
}
