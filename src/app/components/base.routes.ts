import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';

export const BASE_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'orders', component: OrdersComponent }
]