import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {AutheticationGuard} from "./guards/authetication.guard";
import {NotAuthorazetdComponent} from "./not-authorazetd/not-authorazetd.component";
import {AuthorizationGuard} from "./guards/authorization.guard";
const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"/login",pathMatch:"full"},
  {path:"admin", component:AdminComponent,canActivate:[AutheticationGuard],children:[
      {path:"customers",component:CustomersComponent},
      {path:"accounts",component:AccountsComponent},
      {path:"newCustomer",component:NewCustomerComponent,canActivate:[AuthorizationGuard],data:{role:"ADMIN"}},
      {path:"editCustomers/:id",component:EditCustomerComponent,canActivate:[AuthorizationGuard],data:{role:"ADMIN"}},
      {path:"notAuthorazition",component:NotAuthorazetdComponent}
    ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
