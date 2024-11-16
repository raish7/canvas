import { Component } from '@angular/core';
import { FeaturedArtworksComponent } from "../../components/landing/featured-artworks/featured-artworks.component";
import { ChooseUsComponent } from "../../components/landing/choose-us/choose-us.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturedArtworksComponent, ChooseUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateToArtworks() {
    this.router.navigate(['artworks']);
  }

}
