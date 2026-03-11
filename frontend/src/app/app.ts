import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/userService';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
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

    protected readonly title = signal('corpflow');

    isUserAuthenticated(): boolean {
        return this.userService.isAuthenticated();
    }

    logout() {
        this.userService.logout();
    }

    userName(): string {
        const user = this.userService.currentUserSignal();

        if (user) {
            return user.name;
        }
        return "";
    }
}
