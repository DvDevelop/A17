import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { HomeComponent } from './components/home/home.component';
import { isLoggedInGuard } from './auth/guards/is-logged-in.guard';

export const routes: Routes = [
    { path: 'Log-in', component:LoginComponent},
    { path: 'Sing-up', component:SingUpComponent},
    { 
        path: 'Home',
        canMatch: [isLoggedInGuard],
        component:HomeComponent
    },
    { path: '', redirectTo: '/Log-in', pathMatch: 'full'},
    { path: '**', redirectTo: '/Log-in', pathMatch: 'full'}
];
