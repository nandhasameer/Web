import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';
import { ClientPortalService } from './Client-Portal.service';
import { AppConstantService } from './AppConstant.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public appuser: any;
    public MenuList: any;


    constructor(
        public auth: AuthService,
        private Route: Router, public clientPortalService: ClientPortalService, public  appConstantService :AppConstantService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isLoggedIn()) {
        return true;
      } else {

          //this.clientPortalService.getLoginAccess().subscribe(result => {

          //    if (result) {

          //        this.appuser = result.item1;
          //        this.MenuList = result.item2;

          //        //   this.appConstantService.updateMessage(result.item2);

          //        //     this.myoutput.emit(this.MenuList);

          //        // set item for app user
          //        localStorage.setItem('token', result.item1.token);
          //        localStorage.setItem('Client_ID', result.item1.clientId);
          //        localStorage.setItem('User_Name', result.item1.userName);

          //        localStorage.setItem('MenuList', JSON.stringify(result.item2));

          //        // get item for app user
          //        this.appConstantService.GetClient();
          //        this.appConstantService.menuList();


          //    }

          //}, error => console.error(error));

          //this.Route.navigate(['./game-library']);
          //return true;
          this.Route.navigate(['./login']);
          return false;
      }
  }
}
