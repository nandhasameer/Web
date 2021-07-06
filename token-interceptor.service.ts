
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ConfirmationDialogService } from './confirmation-dialog.service';
@Injectable({
    providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
    
    constructor(public confirmationDialogService: ConfirmationDialogService,public Route: Router, public auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {

                Authorization: `Bearer ${this.auth.getToken()}`

            }
        });

        return next.handle(request).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }

                    if (err.status == 401 && null !== this.auth.logoutUser()) {                                        
                        this.auth.logoutUser();
                        return;
                    }
                 
                  
                }
          }));
      

    }
}













