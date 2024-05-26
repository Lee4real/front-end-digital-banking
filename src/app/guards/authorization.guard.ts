import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor( private authService: AuthService,private router:Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any{
    if(this.authService.roles.includes("ADMIN"))
      return true;
    else{
      this.router.navigateByUrl("/admin/notAuthorazition")
      return false;
    }
  }
}
