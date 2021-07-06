
//original 

//import { Component, OnInit, Inject } from '@angular/core';
//import { NewsEventsDetails } from '../models/NewsEventsDetails ';
//import { ClientPortalService } from '../Client-Portal.service';
//import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
//import { AppConstantService } from '../AppConstant.service';
//import { AuthService } from '../auth.service';
//import { Router } from '@angular/router';
//import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
//@Component({
//  selector: 'app-add-news-events-details',
//  templateUrl: './add-news-events-details.component.html',
//  styleUrls: ['./add-news-events-details.component.css']
//})
//export class AddNewsEventsDetailsComponent implements OnInit {

//    public objResources: NewsEventsDetails;
//    public EventDate: NgbDateStruct;
//    public EventHeadLine: string;
//    public EventShortDescription: string;
//    public EventDescription: string;
//    public IsAactive: number;
//    public ListOfNewsEventsDetails: Array<NewsEventsDetails> = new Array<NewsEventsDetails>();
//    public NewsEventData: any;
//    public url: any;
//    public IsSelect: any;
//    public SuccessMessage: any;

   
//    constructor(public authService: AuthService, public clientPortalService: ClientPortalService, public appConstantService: AppConstantService, public router: Router, public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
//        this.url = baseUrl;

//    }

//  ngOnInit() {
//  }

//    public SaveNewsEventsDetails() {
       
       
//        const date = this.EventDate.year + '-' + this.EventDate.month + '-' + this.EventDate.day;
//        this.objResources = new NewsEventsDetails();
//        this.objResources.EventId = 0;
//        this.objResources.EventDate = date;
//        this.objResources.EventHeadLine = this.EventHeadLine;
//        this.objResources.EventShortDescription = this.EventShortDescription;
//        this.objResources.EventDescription = this.EventDescription;

//        if (this.IsSelect) {

//            this.objResources.IsActive = true;
//        } else {

//            this.objResources.IsActive = false;
//        }


//        this.ListOfNewsEventsDetails.push(this.objResources);


//        const request = this.objResources;

//      this.http.post<any>(this.url + 'api/ClientPortalWeb/AddNewsEventsDetails', request).subscribe(Result => {
      
          
//          this.NewsEventData = Result;
//          this.SuccessMessage = Result;
//          setTimeout(() => {
//              this.SuccessMessage = '';
//          }, 4000);
//        });
//        this.Clear();
//    }

//    public Clear()
//    {
//        this.EventHeadLine = null;
//        this.EventShortDescription = null;
//        this.EventDescription = null;
//        this.EventDate = null;
//        this.IsSelect = false;
//    }

//}



//modified



import { Component, OnInit, Inject } from '@angular/core';
import { NewsEventsDetails } from '../models/NewsEventsDetails ';
import { ClientPortalService } from '../Client-Portal.service';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { AppConstantService } from '../AppConstant.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isBoolean } from 'util';
@Component({
    selector: 'app-add-news-events-details',
    templateUrl: './add-news-events-details.component.html',
    styleUrls: ['./add-news-events-details.component.css']
})
//export class AddNewsEventsDetailsComponent implements OnInit {
export class AddNewsEventsDetailsComponent implements OnInit {
   

    registerForm: FormGroup;
    submitted = false;

    public objResources: NewsEventsDetails;
    public EventDate: NgbDateStruct;
    public EventHeadLine: string;
    public EventShortDescription: string;
    public EventDescription: string;
    public IsAactive: boolean;
    public ListOfNewsEventsDetails: Array<NewsEventsDetails> = new Array<NewsEventsDetails>();
    public NewsEventData: any;
    public url: any;
    public IsSelect: any;
    public SuccessMessage: any;
    public IsEnableGameInfo: any;
    public MenuList: any

    public isSave: any;
  public isClear: any;
    public userId: string;
    public errorMgs: any;
    constructor(private formBuilder: FormBuilder,public authService: AuthService, public clientPortalService: ClientPortalService, public appConstantService: AppConstantService, public router: Router, public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.url = baseUrl;

       //added new userId to Db
       this.userId = this.appConstantService.GetUserId();

        this.MenuList = this.appConstantService.menuList();

        var result = this.MenuList.find(o => o.buttonName === "AddNewsEvent");
        var result1 = this.MenuList.find(o => o.buttonName === "ClientPortalAdmin");
        if (result != null || result1 != null) {
            this.IsEnableGameInfo = true;
        }
        else {
            this.IsEnableGameInfo = false;
        }


    }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            EventDate: [Date, Validators.required],
            EventHeadLine: [null, Validators.required],
            EventShortDescription: [null, [Validators.required]],
            EventDescription: [null , [Validators.required]],
            IsSelect: [false, [Validators.required]]
        });

    }

    get f() { return this.registerForm.controls; }

    public SaveNewsEventsDetails() {
        this.isSave = true;
        this.submitted = true;

        if (this.registerForm.invalid) {
          
            return;
        }

        const date = this.EventDate.year + '-' + this.EventDate.month + '-' + this.EventDate.day;
        this.objResources = new NewsEventsDetails();
        this.objResources.EventId = 0;
        this.objResources.EventDate = date;
        this.objResources.EventHeadLine = this.EventHeadLine;
        this.objResources.EventShortDescription = this.EventShortDescription;
        this.objResources.EventDescription = this.EventDescription;

        if (this.IsSelect) {

            this.objResources.IsActive = true;
        } else {

            this.objResources.IsActive = false;
        }

        //added new item to db
      this.objResources.updatedDate = new Date();
      this.objResources.updatedBy = this.userId;
    

        this.ListOfNewsEventsDetails.push(this.objResources);


        const request = this.objResources;

      this.http.post<UserStatus>(this.url + 'api/ClientPortalWeb/AddNewsEventsDetails', request).subscribe(Result => {
            this.isSave = false;
            this.NewsEventData = Result;
           
            this.SuccessMessage = Result.message;
            setTimeout(() => {
                this.SuccessMessage = '';
            }, 4000);

          if (Result.statusId === 1) {
            this.Clear();
          }
          else {
            this.errorMgs === Result.message
            setTimeout(() => {
              this.errorMgs = '';
            }, 4000);
          }

        });
       // this.Clear();
    }


    public BackToAdmin(): any {
       
        this.router.navigate(['/admin']);

    }

    public Clear() {
       // this.isSave = false;
       this.submitted = false;
        this.EventHeadLine = null;
        this.EventShortDescription = null;
        this.EventDescription = null;
        this.EventDate = null;
        this.IsSelect = false;

    }

}


interface UserStatus {
  statusId: number;
  message: string;
}
