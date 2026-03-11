import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/userService';

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
    constructor(private userService: UserService){}

    isUserAuthenticated(): boolean {
        return this.userService.isAuthenticated();
    }

    userName(): string {
        const user = this.userService.currentUserSignal();

        if (user) {
            return user.name;
        }
        return "";
    }
}
