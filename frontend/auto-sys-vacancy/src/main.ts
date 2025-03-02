import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CreateCandidateComponent } from './app/modals/create-candidate/create-candidate.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CandidatesComponent } from './app/components/candidates/candidates.component';
import { CalendarComponent } from './app/components/calendar/calendar.component';
import { VacanciesComponent } from './app/components/vacancies/vacancies.component';
import { provideRouter } from '@angular/router';
bootstrapApplication(AppComponent, {
  providers: [

    provideAnimations(),
    ...appConfig.providers // Если в `appConfig` есть другие провайдеры
  ]
}).catch((err) => console.error(err));