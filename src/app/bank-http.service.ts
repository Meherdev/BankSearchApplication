import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
export class BankHttpService {
  public baseUrl:string ='https://vast-shore-74260.herokuapp.com/banks?city=';

  
  constructor(public _http:HttpClient) { }

  public getAllBanks (city):any{
    let response = this._http.get(this.baseUrl+city);
    return response;
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  } 

}
