import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankHttpService } from '../bank-http.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-bank-view',
  templateUrl: './bank-view.component.html',
  styleUrls: ['./bank-view.component.css']
})
export class BankViewComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    Cookie.delete('favBankCity');
    Cookie.delete('city');
  }

  public currentBankIfsc:string ;
  public currentCity:string;
  public currentBank:any;
  public allBanks:Array<any>;
  public favBankCity :string;

  constructor(private _route : ActivatedRoute,private router: Router , private bankhttpService: BankHttpService) { }

  ngOnInit() {
    this.currentBankIfsc = this._route.snapshot.paramMap.get('bankId');
    console.log(this.currentBankIfsc);
    if(Cookie.get('favBankCity')){
      this.currentCity= Cookie.get('favBankCity');
      Cookie.delete('favBankCity');
    }
    else{
      this.currentCity = Cookie.get('city');
      Cookie.delete('city');
    }
    this.bankhttpService.getAllBanks(this.currentCity).subscribe(
      (data)=>{
        this.allBanks=data.slice();
        this.allBanks.map(bank=>{
          if(bank.ifsc==this.currentBankIfsc){
            this.currentBank=bank;
          }
        })
        console.log(this.currentBank);
      },
      (error)=>{
        console.log("error occurred");
      }
    )
  }

}
