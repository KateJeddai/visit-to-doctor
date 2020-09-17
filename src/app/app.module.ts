import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { MatDatepickerModule,
         MatNativeDateModule,
         MatFormFieldModule,
         MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { AppAbout } from './about/about.component';
import { AppVisit } from './visit/visit.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './services/auth-guard.service';
import { VisitService } from './services/visit.service';
import { MyvisitsComponent } from './myvisits/myvisits.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    AppAbout,
    AppVisit,
    SignupComponent,
    SigninComponent,
    MyvisitsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    CoreModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    FontAwesomeModule    
  ],
  providers: [AuthService, AuthGuard, VisitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
