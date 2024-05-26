import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, finalize, throwError} from "rxjs";
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("inteceptor")
    if(!req.url.includes("/auth/login")){
      console.log("il a entree");
    let request = req.clone({
      headers: req.headers.set("Authorization", "Bearer " +this.authService.accessToken)
    })
    return next.handle(request)
    }
    else
      return next.handle(req).pipe(
        catchError(err=>{
          if(err.status === 401)
          this.authService.logOut();

          return throwError(err)
    })
      );
  }
}
