/**************Module**************/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**************Components**************/
import { LoginComponent } from '../../component/login/login.component';
import { RegistrationComponent } from '../../component/registration/registration.component';
import { HomeComponent } from '../../component/home/home.component';
import { CreateEventComponent } from '../../component/create-event/create-event.component';
import { MyEventsComponent } from '../../component/my-events/my-events.component';
import { PageNotFoundComponent } from '../../component/page-not-found/page-not-found.component';

/**************Guard**************/
import { AuthGuard } from '../../guards/auth.guard';

const routes : Routes = [
  { path : '', redirectTo : "/login", pathMatch : 'full' },
  { path : 'login', component : LoginComponent },
  { path : 'registration', component : RegistrationComponent },
  { path : 'home', component : HomeComponent, canActivate : [AuthGuard] },
  { path : 'create-event', component : CreateEventComponent, canActivate : [AuthGuard] },
  { path : 'my-events', component : MyEventsComponent, canActivate : [AuthGuard] },
  { path : '**', component :PageNotFoundComponent },
] 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class RoutingModule { }
