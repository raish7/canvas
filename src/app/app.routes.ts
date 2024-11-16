import { Routes } from '@angular/router';
import { ArtworksComponent } from './pages/artworks/artworks.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'artworks', component: ArtworksComponent}
];
