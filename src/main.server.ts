import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const bootstrap = () => bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideServerRendering(),
    importProvidersFrom(FormsModule)
  ]
});

export default bootstrap;