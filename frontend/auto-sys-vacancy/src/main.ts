import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CreateCandidateComponent } from './app/modals/create-candidate/create-candidate.component';
import { provideAnimations } from '@angular/platform-browser/animations';
bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    ...appConfig.providers // Если в `appConfig` есть другие провайдеры
  ]
}).catch((err) => console.error(err));