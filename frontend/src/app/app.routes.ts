import { Routes } from '@angular/router';
import { Home } from '../home/home';
import { Signup } from '../signup/signup';
import { Login } from '../login/login';
import { Kanban } from '../kanban/kanban';
import { authGuard } from '../auth/authGuard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'kanban', component: Kanban, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];