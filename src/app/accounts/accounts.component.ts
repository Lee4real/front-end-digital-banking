import {Component, OnInit} from '@angular/core';
import {Account} from "../modules/account.model";
import {accountService} from "../services/account-service.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  public accounts!:Array<Account>;
  private id!:number;
  public errorMessage!: string;
  public fg!:FormGroup;
  private description!:string;
  private argent!:number;
  private accountId!:string;
  constructor(private accountService:accountService,private router:ActivatedRoute,private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];
    this.getCustomerAccount(this.id);
    this.fg=this.fb.group({
      argent:this.fb.control("",[Validators.required,Validators.pattern(/^[0-9]{1,*}$/),]),
      description:this.fb.control("",[Validators.required])
    })
    }
  public getCustomerAccount(id:number){
    this.accountService.getAccountsByconstumerId(this.id).subscribe({
      next:(data:Array<Account>)=> {
        this.accounts=data;
        this.accounts.forEach(value => console.log(value.id))
      },error:err => this.errorMessage=err.message
    })
  }

  public openPopUp(accountid:string) {
    const popUp=document.getElementById("modal");
    this.accountId=accountid;
    if(popUp!=null){
      popUp.style.display="block";
    }
  }
  public closePopUp(){
    const popUp=document.getElementById("modal");
    if(popUp!=null){
      popUp.style.display="none";
    }
  }
  public poseDargent() {
    this.argent=this.fg.value.argent;
    this.description=this.fg.value.description ;
    console.log(this.argent,"  ",this.description," ",this.accountId);
    this.accountService.poserArgent(this.accountId,this.argent,this.description).subscribe({
      next:data=>{
        console.log(this.argent)
      }
    })


  }
}
