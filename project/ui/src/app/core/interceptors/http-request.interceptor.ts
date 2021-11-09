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
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let defaultErrorMsg = 'Falha na comunicação com o servidor';

                switch(error.status) {
                    case 400:
                    case 403:
                    case 404:
                    case 409:
                        this.toastrService.error(error.error, 'Erro HTTP: Cliente');
                        break;
                    case 401:
                        this.toastrService.error(error.error, 'Acesso negado');
                        this.router.navigate(['/login']);
                        break;
                    case 500:
                        this.toastrService.error(error.error, 'Erro HTTP: Servidor');
                        break;
                    default:
                        this.toastrService.error(defaultErrorMsg, 'HTTP Erro');
                        break;
                }
                return throwError(defaultErrorMsg);
            })
        )
    }
}