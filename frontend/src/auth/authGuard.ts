import { CanActivateFn } from "@angular/router";
import { UserService } from "../services/userService";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);

    if (userService.isAuthenticated()) {
        return true;
    } else {
        userService.logout();
        return false;
    }
};