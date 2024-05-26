import {Component, OnInit} from '@angular/core';
import {Customers} from "../modules/customer.model";
import {CustomerService} from "../services/customer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {PageCustomerDto} from "../modules/PageCustomerDto.model";
import {AuthService} from "../services/auth.service";
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  public customers: Array<Customers>=new Array<Customers>();
  public errorMessage!:string;
  public searchFormGroup!: FormGroup;
  public size:number=3;
  public currentPage:number = 0;
  public totalPages!:number;
  public totalCustomers:number=0;
  public keyword!:string
  constructor(private customerService:CustomerService,private fb:FormBuilder,private router:Router,public authService:AuthService) {
  }
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
   this.searchCustomers();
  }
  hadleDeleteCustomer(customer: Customers) {
    let conf=confirm("Are you sure you want to delete this customer?");
    if(!conf) return;
    this.customerService.deleteConstumer(customer.id).subscribe({
      next:data=>{
        this.customers=this.customers.filter(value => value.id !== customer.id);
        if(this.customers.length==0){
          this.currentPage=this.currentPage-1;
          this.searchCustomers();
        }
        else
          this.searchCustomers();
      }
    })
  }
  handleEditContumer(customer: Customers) {
    this.router.navigateByUrl("/admin/editCustomers/"+customer.id)
   }
  handleCustomerAccount(id: number) {
    this.router.navigateByUrl("/admin/accounts/"+id);
  }
  public searchCustomers(){
    this.keyword=this.searchFormGroup.value.keyword;
    this.totalCustomer();
    this.customerService.getAllCustomers(this.keyword,this.currentPage,this.size).subscribe({
      next:(data:PageCustomerDto)=>{
        console.log(this.totalCustomers)
        this.customers=data.customerDtos
         this.totalPages=Math.floor(this.totalCustomers/this.size);
         if(this.totalCustomers%this.size!=0)
           this.totalPages+=1
        console.log(this.totalCustomers)
      }
    })
  }
  handelGoToPage(page: number) {
    this.currentPage=page
    this.searchCustomers();
  }
  public totalCustomer(){
    this.customerService.getCustomers(this.keyword).subscribe(value => {
      this.totalCustomers=value.length;
    })
  }
}



