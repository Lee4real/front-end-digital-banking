import {Customers} from "./customer.model";
export interface PageCustomerDto {
  customerDtos: Array<Customers>;
  size: number;
  currentPage: number;
  totalPages: number;
}
