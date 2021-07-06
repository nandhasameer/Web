
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FooterComponent } from './footer/footer.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameLibraryComponent } from './game-library/game-library.component';
import { GameResourcesComponent } from './game-resources/game-resources.component';
import { HeaderComponent } from './header/header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoComponent } from './logo/logo.component';
import { NewsEventsComponent } from './news-events/news-events.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { RoadMapComponent } from './road-map/road-map.component';
import { AdminComponent } from './admin/admin.component';
import { AppConstantService } from './AppConstant.service';
import { ClientPortalService } from './Client-Portal.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { GrdFilterPipe } from './filter.pipe';
import { FileTableComponent } from './file-table/file-table.component';
import { CategaoryFilter } from './Category.pipe';
import { AddGameInfoDetailsComponent } from './add-gameInfo-details/add-gameInfo-details.component';
import { AddNewsEventsDetailsComponent } from './add-news-events-details/add-news-events-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadFilesComponent } from './Upload-Files/Upload-Files.component';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        CounterComponent,
        FetchDataComponent,
        FooterComponent,
        GameDetailComponent,
        GameLibraryComponent,
        GameResourcesComponent,
        HeaderComponent,
        LoginPageComponent,
        LogoComponent,
        NewsEventsComponent,
        SocialMediaComponent,
        RoadMapComponent,
        AdminComponent,
        GrdFilterPipe,
        FileTableComponent,
        CategaoryFilter,
        AddGameInfoDetailsComponent,
        AddNewsEventsDetailsComponent,
        UploadFilesComponent,
        ConfirmationDialogComponent,
        ErrorPageComponent,
    ],
   
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        NgbModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        RouterModule.forRoot([          
        { path: '', component: LoginPageComponent, pathMatch: 'full', canActivate: [AuthGuard] },        
        { path: 'counter', component: CounterComponent },
        { path: 'fetch-data', component: FetchDataComponent },
        { path: 'login', component: LoginPageComponent },
        { path: 'gameLibrary', component: GameLibraryComponent, canActivate: [AuthGuard] },
        { path: 'gameDetail', component: GameDetailComponent, canActivate: [AuthGuard] },
        { path: 'gameResources', component: GameResourcesComponent, canActivate: [AuthGuard] },
        { path: 'roadmap', component: RoadMapComponent, canActivate: [AuthGuard] },
        { path: 'news&events', component: NewsEventsComponent, canActivate: [AuthGuard] },
        { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
        { path: 'AddGameInfoDetails', component: AddGameInfoDetailsComponent, canActivate: [AuthGuard] },
        { path: 'AddNewsEventsDetails', component: AddNewsEventsDetailsComponent, canActivate: [AuthGuard] },
        { path: 'UploadFiles', component: UploadFilesComponent, canActivate: [AuthGuard] },      
        { path: '**', component: GameLibraryComponent, canActivate: [AuthGuard] }
      ])
   ],
    providers: [ClientPortalService, AppConstantService, AuthGuard, AuthService, ConfirmationDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,       
        }],
    entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {    
}







