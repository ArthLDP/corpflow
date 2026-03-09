import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UserAuthService } from '../services/userAuthService';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    constructor(private userAuthService: UserAuthService){}

    protected readonly title = signal('corpflow');

    isUserAuthenticated(): boolean {
        return this.userAuthService.isAuthenticated();
    }

    logout() {
        this.userAuthService.logout();
    }
}
