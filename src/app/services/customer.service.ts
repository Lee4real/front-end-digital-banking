import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Customers} from "../modules/customer.model";
import {Observable} from "rxjs";
import {PageCustomerDto} from "../modules/PageCustomerDto.model";
import {Account} from "../modules/account.model";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private backendUrl:string = "http://localhost:8080";
  constructor(private http: HttpClient) {
  }
  public getCustomers(keyword:string=""): Observable<Array<Customers>> {
    let param=new HttpParams().set("keyword",keyword)
    return this.http.get<Array<Customers>>(this.backendUrl+"/customers/search",{params:param});
  }
  public saveCustomer(customer:Customers): Observable<Customers> {
    return this.http.post<Customers>(this.backendUrl+"/customers",customer);
  }
  public deleteConstumer(id:number) {
    return this.http.delete(this.backendUrl+"/customers/"+id);
  }
  public editCustomer(customer: Customers) {
    return this.http.put<Customers>(`${this.backendUrl}/customerEdit/${customer.id}`, customer);
  }

  public getCustomerByid(id:number):Observable<Customers> {
    return this.http.get<Customers>(this.backendUrl+"/customers/"+id);
  }
  public getAllCustomers(keyword:string="",page:number=0,size:number=2):Observable<PageCustomerDto>{
    let param=new HttpParams().set("keyword",keyword).set("page",page.toString()).set("size",size.toString());
    return this.http.get<PageCustomerDto>(this.backendUrl+"/customer/search",{params:param});
  }

}
