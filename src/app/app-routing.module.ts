import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppAbout } from './about/about.component';
import { AppVisit } from './visit/visit.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './services/auth-guard.service';
import { MyvisitsComponent } from './myvisits/myvisits.component';

 const appRoutes: Routes = [
     { path: '', component: AppAbout },
     { path: 'registration', component: SignupComponent },
     { path: 'login', component: SigninComponent },
     { path: 'new-visit', canActivate: [AuthGuard], component: AppVisit }
 ]

 @NgModule({
     imports: [RouterModule.forRoot(appRoutes)],
     exports: [RouterModule]
 })

 export class AppRoutingModule {}