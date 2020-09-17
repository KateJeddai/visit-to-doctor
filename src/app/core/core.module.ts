import { NgModule } from "@angular/core";
import { AppHeader } from './header/header.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppHeader
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FontAwesomeModule
    ],
    exports: [
        AppRoutingModule,
        AppHeader
    ]
})

export class CoreModule{ }