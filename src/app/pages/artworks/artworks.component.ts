import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ArtworksService } from '../../services/artworks/artworks.service';
import { CardSkeletonComponent } from '../../components/skeleton/card-skeleton/card-skeleton.component';
import { FormsModule } from '@angular/forms';
import { UrlQueryService } from '../../utils/url-query.service';
import { toastMixin } from '../../utils/toastMixin';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-artworks',
  standalone: true,
  imports: [NgFor, NgIf, CardSkeletonComponent, FormsModule, RouterModule],
  templateUrl: './artworks.component.html',
  styleUrl: './artworks.component.scss',
})
export class ArtworksComponent {
  constructor(
    private router: Router,
    private artworkService: ArtworksService,
    private urlQueryService: UrlQueryService,
    public authService: AuthService
  ) {}
  artworksData: any[] = [];
  categories: any[] = [{ id: '', name: 'Category' }];
  artists: any[] = [{ id: '', anme: 'Artist'}]
  fetchingData = false;
  isUserArtist = false;
  query = {
    priceSortBy: '',
    category: '',
    artistId: '',
  };
  selectedPrice = '';
  selectedCategory = '';
  id = null;

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user') as any)?.roles.includes('ARTIST')) {
      this.query.artistId = (JSON.parse(localStorage.getItem('user') as any).id);
      this.isUserArtist = true;
    }
    this.getArtWorks();
    this.getCategories();
  }
  getColumns() {
    const columns: any[][] = [];
    const columnCount = 4; // Adjust based on your grid layout
    for (let i = 0; i < columnCount; i++) {
      columns[i] = [];
    }
    this.artworksData.forEach((image, index) => {
      columns[index % columnCount].push(image);
    });
    return columns;
  }

  getArtWorks() {
    this.fetchingData = true;
    this.artworkService
      .getArtWorks(this.urlQueryService.setUrlQuery(this.query))
      .subscribe({
        next: (data: any) => {
          this.artworksData = data.data;
        },
        error: (err) => {
          console.log('err', err);
          toastMixin('error', 'Failed to fetch artworks');
        },
        complete: () => {
          this.fetchingData = false;
        },
      });
  }

  getCategories() {
    this.artworkService.getCategories().subscribe({
      next: (data: any) => {
        data.data.forEach((item: any) => {
          this.categories.push(item);
        });
      },
      error: (err) => {
        console.log('err', err);
        toastMixin('error', 'Failed to fetch categories');
      },
      complete: () => {},
    });
  }

  navigateToArtworksDetail(image: any) {
    this.router.navigate(['artworks', image.id]);
  }

  sortArtworks(value: any, sortBy: 'priceSortBy' | 'category') {
    this.query[sortBy] = value.value;
    this.getArtWorks();
  }

  clearFilters() {
    this.query.priceSortBy = '';
    this.query.category = '';
    this.selectedCategory = '';
    this.selectedPrice = '';
    this.getArtWorks();
  }
}
