import { Routes } from '@angular/router';
import {ReqisterComponent} from './pages/reqister/reqister.component'
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
export const routes: Routes = [
    {path:"",component:ReqisterComponent},
    {path:"register",component:ReqisterComponent},
    {path:"login",component:LoginComponent},
    {path:"main",component:MainComponent},
    {path:"**",component:LoginComponent}
];
