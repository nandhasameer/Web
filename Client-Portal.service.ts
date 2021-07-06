import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';
import { AppConstantService } from './AppConstant.service';
import { SlotGamesGameInfo, GameInfo ,UserStatus } from './../app/Interface/SlotGamesGameInfo'




@Injectable({
  providedIn: 'root'
})
export class ClientPortalService {
    public url: string;
    public apiUrl: any;
    public FileManagementApiUrl = "";
 
    constructor(public appConstantService: AppConstantService,public authService: AuthService , public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
  }


  loadConfig(): Observable<any>
  {
      return this.http.get<any>(this.url + 'api/ClientPortalWeb/ConfigurationData');        
  }

  getAppVersion(): Observable<any> {

      return this.http.get<any>(this.url + 'api/ClientPortalWeb/GetAppVersion');    
  }


  getLogin(userid: string, pwd: any): Observable<any>
  {
    return this.http.get<any>(this.url + 'api/Users/Authenticate?UserId=' + userid + '&Password=' + pwd);
  }

   

  getTryNow(GameId: any, ClientId: any): Observable<any> {
      return this.http.get<any>(this.url + 'api/ClientPortalWeb/GetTryNow?GameID=' + GameId + '&ClientId=' + ClientId);
      
  }

  getNewsandEvents(): Observable<any> {
      return this.http.get<any>(this.url + 'api/ClientPortalWeb/GetNewsAndEvents');
  }


  GetGameInfoDetails(GameId :any ): Observable<any> {
      return this.http.get<any>(this.url + 'api/ClientPortalWeb/GetGameInfoDetails?GameId=' + GameId);
  }



  getGameCategory(): Observable<any>
  {
      return this.http.get<any>(this.url + 'api/ClientPortalWeb/GetGameCategory');
  }



  getGameLibrary(CategeoryId: any): Observable<any>
  {
      return this.http.get<any>(this.url + 'api/ClientPortalWeb/GetGameDetailsByCategory?CategeoryId=' + CategeoryId );
  }

   FileUpload(file:any): Observable<any>
   {
      
       return this.http.post<any>(this.url + 'api/ClientPortalWeb/FileUpload', file);
   }

  UpdateGameList(): Observable<UserStatus> {

    return this.http.get<UserStatus>(this.url + 'api/ClientPortalWeb/UpdateGameList');
    }

    GetGameInfo(GameID: any): Observable<GameInfo> {
      return this.http.post<GameInfo>(this.url + 'api/ClientPortalWeb/GetGameInfo?GameID=' + GameID, null); 
    }


    downloadFile(ListUrl: string[]): Observable<any> {
    
     
      return this.http.post<any>(this.url  + 'api/ClientPortalWeb/Download' ,  ListUrl);
    }



}
