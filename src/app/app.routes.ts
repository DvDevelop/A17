import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/Log-in', pathMatch: 'full'},
    { path: 'Log-in', component:LoginComponent},
    { path: 'Sing-up', component:SingUpComponent},
    { path: 'Home', component:HomeComponent},
    { path: '**', redirectTo: '/Log-in', pathMatch: 'full'}
];
