import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin!:FormGroup
  private username!:string
  constructor(private fb:FormBuilder,private authService: AuthService,private router:Router) {

  }
  ngOnInit() {
  this.formLogin=this.fb.group({
    name: this.fb.control(""),
    password:this.fb.control("")
    }
  )
  }

  handleLogin() {

  this.authService.Login(this.formLogin.value.name,this.formLogin.value.password).subscribe({
    next:(data:any)=>{
      console.log(data)
      this.authService.loadProfile(data);
      this.router.navigateByUrl("/admin");
    },
    error:(data:any)=>{
      console.log(this.formLogin.value.name+this.formLogin.value.password)
      console.log(data)},
  });
  }
}
