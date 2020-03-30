/****************Inbuilt Modules********************/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/****************Imported Modules********************/
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/****************Installed Modules********************/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/****************Custom Modules********************/
import { RoutingModule } from '../app/modules/routing/routing.module';

/****************Components********************/
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HomeComponent } from './component/home/home.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { MyEventsComponent } from './component/my-events/my-events.component';
import { CreateEventComponent } from './component/create-event/create-event.component';

/****************Services********************/
import {InterceptorService } from '../app/services/interceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    PageNotFoundComponent,
    MyEventsComponent,
    CreateEventComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
