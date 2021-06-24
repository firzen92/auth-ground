import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user$.pipe(
            take(1),
            exhaustMap(user => {
                console.log('inside exhaustMap');
                if(!user) {
                    return next.handle(req);
                }
                let modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }
}