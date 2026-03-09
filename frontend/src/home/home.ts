import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserAuthService } from '../services/userAuthService';

@Component({
    selector: 'app-home',
    imports: [
        RouterLink,
        MatCardModule,
        MatButtonModule
    ],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
    constructor(private userAuthService: UserAuthService){}

    isUserAuthenticated(): boolean {
        return this.userAuthService.isAuthenticated();
    }
}
