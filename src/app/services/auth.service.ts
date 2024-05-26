import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean=false;
  roles:any;
  username:any;
  accessToken:any;
  constructor(private http:HttpClient,private router:Router) { }
  public Login(username:string,password:string){
    let options={headers:new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
    let params:HttpParams=new HttpParams().set("username",username).set("password",password);
    return this.http.post("http://localhost:8080/auth/login",params,options)
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken=data["access-token"];
    console.log(this.accessToken);
    let decodeJWt:any=jwtDecode(this.accessToken);
    this.username=decodeJWt.sub
    this.roles=decodeJWt.scope;
    console.log(this.username,this.roles)
    window.localStorage.setItem("jwt-token",this.accessToken)
  }

  logOut() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.username=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("jwt-token");
    this.router.navigateByUrl("/login")
  }

  loadJwtTokenFromLocalStorage() {
    let token=window.localStorage.getItem("access-token");
    if(token){
      this.loadProfile({"access-token":token})
      this.router.navigateByUrl("/admin/customers")
    }
  }
}