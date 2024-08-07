import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if(!navigator.geolocation){
  alert("El navegador no soporta la geolocation");
  throw new Error("El navegador no soporta la geolocation");
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
