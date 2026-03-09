import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../auth/authInterceptor';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const appConfig: ApplicationConfig = {
  providers: [
    SsrCookieService,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
};
