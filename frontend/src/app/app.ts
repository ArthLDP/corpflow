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
export class App {
    constructor(private userService: UserService){}

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
