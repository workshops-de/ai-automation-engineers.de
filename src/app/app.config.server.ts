import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideRouter(routes),
    importProvidersFrom(FormsModule)
  ]
};

export const config = mergeApplicationConfig({
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule)
  ]
}, serverConfig);