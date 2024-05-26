import {Customers} from "./customer.model";
export interface Account {
  id: string;
  customerDto:Customers,
  balance:number,
  type:string,
  status:string,
  createdAt:Date,
}
