
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { faUser, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConstantService } from '../AppConstant.service';
import { ClientPortalService } from '../Client-Portal.service';
import { AuthService } from '../auth.service';
import { ConfirmationDialogService } from '../confirmation-dialog.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  faUser = faUser;
  faUserLock = faUserLock;
  public isLogin :any
  public appuser: any;
  public MenuList: any;

  public userId: string;
  public password: string;
  public errorMgs: string;
  public url: string;
  public data: any;
  public show: any;

  // @Output() myoutput: EventEmitter<any> = new EventEmitter();

  constructor(public confirmationDialogService: ConfirmationDialogService,public authService: AuthService, public clientPortalService: ClientPortalService, public appConstantService: AppConstantService, public router: Router, public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
    this.show = false;       
  }
  
  ngOnInit() {     
  }

  ShowPassword() {
      this.show = !this.show;
  }

  public submitButton() {
    this.isLogin = true;

      this.clientPortalService.getLogin(this.userId, this.password).subscribe(result => {
        this.isLogin = false;  
        if (result.item1.message == null) {

            this.appuser = result.item1;
            this.MenuList = result.item2;
            // this.myoutput.emit(this.MenuList);

           
            //set item for app user - session storage
          sessionStorage.setItem('token', result.item1.token);
          sessionStorage.setItem('Client_ID', result.item1.clientId);
          sessionStorage.setItem('User_Name', result.item1.userName);
          sessionStorage.setItem('MenuList', JSON.stringify(result.item2));
          sessionStorage.setItem('User_Id', result.item1.userId);


            //get item for app user
           this.appConstantService.GetClient();
           this.appConstantService.menuList();                
           this.router.navigate(['./game-library']);                 
          }
          else {
              this.errorMgs = result.item1.message;
              setTimeout(() => {
                  this.errorMgs = '';
              }, 3000);
          }
      }, error => console.error(error));                        
  }        
}

interface AppUSer {
  ClientId: number;
  CountryId: number;
  Country: string;
  UserId: number;
  UserName: string;
  LocationCode: string;
  LocalCurrency: string;
  ButtonName: string;
  Password: string;

}
interface MenuList {
  ButtonName: string;
  ClientId: number;
}








