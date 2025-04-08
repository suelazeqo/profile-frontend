import {ApplicationConfig, InjectionToken} from '@angular/core';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideZoneChangeDetection} from '@angular/core';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {environment} from '../environments/environment';
import {provideNativeDateAdapter} from '@angular/material/core';

export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => environment.apiURL
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideNativeDateAdapter(),
    {provide: API_URL, useValue: environment.apiURL}
  ]
};
