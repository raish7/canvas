import { Routes } from '@angular/router';
import { ArtworksComponent } from './pages/artworks/artworks.component';
import { HomeComponent } from './pages/home/home.component';
import { ArtworksDetailComponent } from './pages/artworks-detail/artworks-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { ArtworkFormComponent } from './pages/artwork-form/artwork-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'artworks',      // This only handles /artworks (the list of artworks)
    component: ArtworksComponent,
  },
  {
    path: 'artworks/:id',  // This will handle the specific artwork detail page
    component: ArtworksDetailComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'add/artwork',
    component: ArtworkFormComponent
  }
];
