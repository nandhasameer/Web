import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    search = new EventEmitter<string>();
    private _listners = new Subject<any>();
  
  public User_Name: string;
  public Token: string;
  public Client_ID: string;

  constructor(public httpClient: HttpClient , public router: Router ) { }

    listen(): Observable<any> {
        // debugger;
        return this._listners.asObservable();
    }

    filter(filterBy: string) {
        //debugger;
        this._listners.next(filterBy);
    }

    public getToken() {
      return sessionStorage.getItem('token');
    }


    public isLoggedIn() {
      return this.getToken() !== null;

    }

    public logoutUser() {
        sessionStorage.removeItem('User_Id'),
        sessionStorage.removeItem('token'),
        sessionStorage.removeItem('User_Name'),
        sessionStorage.removeItem('Client_ID'),
        sessionStorage.removeItem('MenuList'),
        this.router.navigate(['./login']);
    }


}
