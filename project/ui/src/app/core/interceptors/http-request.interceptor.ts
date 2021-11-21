import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private toastrService: ToastrService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                let defaultErrorMsg: string = 'Falha na comunicação com o servidor';
                let errorMsg: string = (error && error.error && typeof (error.error === 'string')) ? error.error : defaultErrorMsg
                console.log(error.error.error);
                
                switch(error.status) {
                    case 200:
                    case 201:
                        this.toastrService.success(error.error.text)
                        break;
                    case 403:
                        this.toastrService.error(error.error)
                        break;
                    case 400:
                    case 404:
                    case 409:
                        this.toastrService.error(errorMsg);
                        break;
                    case 401:
                        this.toastrService.error(errorMsg);
                        this.router.navigate(['/login']);
                        break;
                    case 500:
                        this.toastrService.error(errorMsg);
                        break;
                    default:
                        this.toastrService.error(defaultErrorMsg);
                        break;
                }
                return throwError(error);
            })
        )
    }
}