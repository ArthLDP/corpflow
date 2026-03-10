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
export class Home implements OnInit {
    constructor(private userService: UserService){}
    ngOnInit(): void {
        const token = this.userService.getToken();
        if (token) {
            const userEmail = this.userService.getUserEmailFromToken(token);
            this.userService.getUserByEmail(userEmail).subscribe({
                next: (res) => {
                    this.userService.currentUserSignal.set(res);
                },
                error: (err) => {
                    console.error(err);
                }
            })
        }
    }

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
