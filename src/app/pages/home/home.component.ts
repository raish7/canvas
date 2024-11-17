import { Component } from '@angular/core';
import { FeaturedArtworksComponent } from "../../components/landing/featured-artworks/featured-artworks.component";
import { ChooseUsComponent } from "../../components/landing/choose-us/choose-us.component";
import { HeroComponent } from "../../components/landing/hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturedArtworksComponent, ChooseUsComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { }
