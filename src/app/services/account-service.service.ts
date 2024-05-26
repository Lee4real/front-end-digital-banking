import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../modules/account.model";
@Injectable({
  providedIn: 'root'
})
export class accountService {
  private backendUrl:string = "http://localhost:8080";
  constructor(private http: HttpClient) {
  }
  public getAccountsByconstumerId(consumerId:number=1):Observable<Array<Account>> {
    return this.http.get<Array<Account>>(this.backendUrl+"/accountsCustomers/"+consumerId)
  }
  public poserArgent(id:string,amount:number,description:string) {
    let param=new HttpParams().set("amount",amount).set("description",description);
    return this.http.put(this.backendUrl+"/accountCustomer/"+id, {params:param});

  }
}

