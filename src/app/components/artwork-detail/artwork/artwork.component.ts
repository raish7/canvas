import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtworksService } from '../../../services/artworks/artworks.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-artwork',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './artwork.component.html',
  styleUrl: './artwork.component.scss'
})
export class ArtworkComponent {
  @Input() artWork!: any;
  @Input() id!: number;
  isAdded = false;
    constructor(
      private artworkService: ArtworksService,
      private router: Router,
      public authService: AuthService
    ) {}
  purchaseItem(data: any) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { routeBack: `/artworks/${this.id}` },
      });
      return;
    }
    this.artworkService.addCheckOutItems({ ...data, quantity: 1 });
    this.router.navigate(['/checkout']);
  }

  addToCart(data: any) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { routeBack: `/artworks/${this.id}` },
      });
      return;
    }
    this.isAdded = true;

    setTimeout(() => {
      this.isAdded = false;
    }, 5000);
    this.artworkService.addCheckOutItems({ ...data, quantity: 1 });
  }

  navigateToArtist(artist: any) {
    this.router.navigate([`/profile/${artist.id}`]);
  }
}
