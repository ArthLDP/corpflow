import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserAuthService } from '../services/userAuthService';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(UserAuthService);
    const token = authService.getToken();

    if (token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next(authReq);
    }

    return next(req);
};