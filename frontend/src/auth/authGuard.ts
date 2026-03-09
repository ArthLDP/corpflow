import { CanActivateFn } from "@angular/router";
import { UserAuthService } from "../services/userAuthService";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(UserAuthService);

    if (authService.isAuthenticated()) {
        return true;
    } else {
        authService.logout();
        return false;
    }
};