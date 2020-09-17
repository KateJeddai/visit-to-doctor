import  { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { faMedkit } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class AppHeader {
    faMedkit = faMedkit;

    constructor(private authService: AuthService) {}

    onLogout() {
        this.authService.logOut();
    }
}