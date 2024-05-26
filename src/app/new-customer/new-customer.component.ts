import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customers} from "../modules/customer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
  public newCustomerFormGroup!: FormGroup;
  public customerAdded!:number;
  constructor(private fb: FormBuilder,private customerService: CustomerService,private router:Router)  {
  }
  ngOnInit() {
      this.newCustomerFormGroup=this.fb.group({
        name:this.fb.control("",[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
        adressMail:this.fb.control("",[Validators.required,Validators.email]),
      })
  }
  handleSaveCustomer() {
      let costumer:Customers=this.newCustomerFormGroup.value;
      this.customerService.saveCustomer(costumer).subscribe({
        next:(data:Customers)=>{
          this.customerAdded=1;
          setTimeout(()=>{
            this.router.navigateByUrl("/admin/customers");
          },2000)
        }
      });
  }
}
