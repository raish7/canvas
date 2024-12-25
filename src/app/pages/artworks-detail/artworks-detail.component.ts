import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ArtworksService } from '../../services/artworks/artworks.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { DetailPageSkeletonComponent } from '../../components/skeleton/detail-page-skeleton/detail-page-skeleton.component';
import { AuthService } from '../../services/auth/auth.service';
import { toastMixin } from '../../utils/toastMixin';

@Component({
  selector: 'app-artworks-detail',
  standalone: true,
  imports: [NgFor, NgIf, DetailPageSkeletonComponent, CommonModule],
  templateUrl: './artworks-detail.component.html',
  styleUrl: './artworks-detail.component.scss',
})
export class ArtworksDetailComponent {
  id: any;
  artWork: any;
  fetchingData = true;
  isAdded = false;

  constructor(
    private artworkService: ArtworksService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params['id']; // Access the 'id' parameter from the URL
    });
    this.getArtWork();
  }
  getArtWork() {
    this.fetchingData = true;
    this.artworkService.getArtWorkById(this.id).subscribe({
      next: (data: any) => {
        this.artWork = data.data;
      },
      error: (err) => {
        console.log('err', err);
        toastMixin('error', 'Failed to fetch artoworks');
      },
      complete: () => {
        this.fetchingData = false;
      },
    });
  }

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
    // this.router.navigate([`/profile/${artist.id}`]);
  }
}
