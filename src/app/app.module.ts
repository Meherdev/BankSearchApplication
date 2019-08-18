import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BankViewComponent } from './bank-view/bank-view.component';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { BankHttpService } from './bank-http.service';
import {HttpCacheService} from './cache.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CacheInterceptor } from './Interceptors/cacheInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BankViewComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    TooltipModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      [{path:"home", component: HomeComponent},
      {path:"bank-view/:bankId",component:BankViewComponent},
      {path:"",redirectTo:"home",pathMatch:"full"}]
      //{path:"**",component:PageNotFoundComponent}
    )
  ],
  providers: [BankHttpService,HttpCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
