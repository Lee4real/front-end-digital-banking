import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customers} from "../modules/customer.model";
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit{
  public editCustomerFormGroup!:FormGroup;
  public customerEdit!: number;
  private customer!:Customers;
  private id!:number;
  constructor(private rt:Router,private customerService: CustomerService,private router:ActivatedRoute,private fb:FormBuilder) {
  }
  ngOnInit() {
     this.id=this.router.snapshot.params['id'];
    this.customerService.getCustomerByid(this.id).subscribe(value => {
      this.customer= value as Customers;
      console.log(this.customer.id+"initialisation");
      this.editCustomerFormGroup=this.fb.group({
        adressMail:this.fb.control(this.customer.adressMail,[Validators.required,Validators.email]),
        name:this.fb.control(this.customer.name,[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)])
      })
    })
  }
  handleEditCustomer() {
    let conf=confirm("Are you sure you want to edit this customer?");
    this.customer=this.editCustomerFormGroup.value;
    this.customer.id=this.id;
    console.log(this.customer.id)
    if(!conf) return;
    this.customerService.editCustomer(this.customer).subscribe(value => {
      this.customerEdit=1;
      setTimeout(()=>{
        console.log("tout passe bien ")
        this.rt.navigateByUrl("/admin/customers")
      },1500)
    })

  }
}
