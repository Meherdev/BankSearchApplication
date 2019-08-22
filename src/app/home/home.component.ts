import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BankHttpService } from '../bank-http.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  public allBanks:Array<any>;
  public selectedCity:string='';
  public bankStatus:boolean=false;
  public filteredBanks:Array<any>;
  public citySelected:boolean = false;
  public cities =['MUMBAI','HYDERABAD','CHENNAI','BANGALORE','DELHI','TIRUPATI'];
  public favouriteBanks:Array<any>=[];
  public favButton :boolean=false;
  public NumberArray : Array<Number>;
  public pageLength : number = 10;

  private _searchTerm:string;
  get filterText (){
    return this._searchTerm;
  }

  set filterText (value :string){
    this._searchTerm=value;
    this._searchTerm=this._searchTerm.toUpperCase();
    console.log(this._searchTerm);
    this.filteredBanks=this.filteringBanks(this._searchTerm);
  }
  constructor(private _route: ActivatedRoute,private router: Router,public bankhttpService:BankHttpService,private toastr :ToastrService) {
    
   }
  
  ngOnInit() {
    this.NumberArray=Array(15).fill(1).map((x,i)=>i+1);
    //console.log(this.NumberArray);
    if((Cookie.get('favBanks'))!=null){
      let data= JSON.parse(Cookie.get('favBanks'));
    //   console.log(data);
    this.favouriteBanks = Object.keys(data).map(key => {
      return data[key];
    })
    console.log(this.favouriteBanks);
    }
     
  }


  public onSelectingCity (val:any){
    this._searchTerm='';
    
    this.bankhttpService.getAllBanks(val).subscribe(
      (data)=>{
        this.allBanks=data;
        //console.log(this.allBanks[4]);
        for(var bank of this.allBanks){
          bank.favourite=false;
          for(var favBank of this.favouriteBanks){
              if(bank.ifsc==favBank.ifsc){
                bank.favourite=true;
              }
          }
        }
        this.filteredBanks=this.allBanks;

      },
      (error)=>{
        console.log("error occurred");
      }
    )
    
  }

  public filteringBanks (searchString :string){
    return this.allBanks.filter(banks=>{
     return (banks.bank_name.startsWith(searchString)==true || banks.branch.startsWith(searchString)==true || banks.ifsc.startsWith(searchString)==true || banks.state.startsWith(searchString)==true)  ;
    })
  }
  
  public onClickingBanks(currentBank: any) {

    console.log(currentBank.favourite);

    if (currentBank.favourite == true) {
      var index;
      currentBank.favourite = false;
      for (var x in this.favouriteBanks) {
        if (this.favouriteBanks[x] == currentBank.ifsc) {
          index = x;
        }
      }
      this.favouriteBanks.splice(index, 1);
      console.log(this.favouriteBanks);
      Cookie.set('favBanks', JSON.stringify(this.favouriteBanks));
      this.toastr.error('Bank Removed from favourites');
    } else {
      currentBank.favourite = true;
      this.favouriteBanks.push(currentBank);
      console.log(this.favouriteBanks);
      Cookie.set('favBanks', JSON.stringify(this.favouriteBanks));
      
      this.toastr.success('Bank Added to favourites')
    }

  }

  public onClickingFavButton(){
    this.favButton=true;
  }

  public favBankViewClicked(city :string,bankId :String){
    console.log(city,bankId);
    Cookie.set('favBankCity',city);
    // this.router.navigate(['/bank-view',bankId]);
  }

  public bankViewClicked(city:string,bankId:string){
    console.log(city,bankId);
    Cookie.set('city',city);
  }
}
