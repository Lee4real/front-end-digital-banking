import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router,public authService: AuthService) {

  }

  handleLogOut() {
    this.authService.logOut();
    this.router.navigateByUrl("/login");
  }
}
