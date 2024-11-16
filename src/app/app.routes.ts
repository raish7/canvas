import { Routes } from '@angular/router';
import { ArtworksComponent } from './pages/artworks/artworks.component';
import { HomeComponent } from './pages/home/home.component';
import { ArtworksDetailComponent } from './pages/artworks-detail/artworks-detail.component';

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
];
