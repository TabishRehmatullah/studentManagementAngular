import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideToastr(),
  
  ]
};
