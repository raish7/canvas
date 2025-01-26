import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artwork-card',
  standalone: true,
  imports: [],
  templateUrl: './artwork-card.component.html',
  styleUrl: './artwork-card.component.scss'
})
export class ArtworkCardComponent {
  image = input.required<any>();

  constructor(private router: Router) {}

  navigateToArtworksDetail(image: any) {
    this.router.navigate(['artworks', image.id]);
  }

  navigateToArtist(artist: any) {
    this.router.navigate([`/profile/${artist.id}`]);
  }
}
