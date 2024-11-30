import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ArtworksService } from '../../services/artworks/artworks.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DetailPageSkeletonComponent } from "../../components/skeleton/detail-page-skeleton/detail-page-skeleton.component";

@Component({
  selector: 'app-artworks-detail',
  standalone: true,
  imports: [NgFor, NgIf, DetailPageSkeletonComponent, CommonModule],
  templateUrl: './artworks-detail.component.html',
  styleUrl: './artworks-detail.component.scss'
})
export class ArtworksDetailComponent {
  image =  {
    id: 3,
    title: "Sculptural Piece",
    artist: "Will Cotton",
    year: 2023,
    price: "US$18,000",
    image: "https://i.pinimg.com/550x/07/31/39/073139a573876d25d8915dc9430432c6.jpg",
    description: "This is a description of the sculpture. It is made of stone and is very unique and beautiful. It is made of stone and is very unique and beautiful. It is made of stone and is very unique and beautiful.",
    tags: ["Unique", "Sculpture", "Oil Painting", "Abstract", "Renaissance"],
  };
  id: any;
  artWork: any;
  fetchingData = true;
  isAdded = false;

  constructor(private artworkService: ArtworksService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      console.log('Test ID:', this.id);
    });
    this.fetchingData = true;
    this.getArtWork();
  }
  getArtWork() {
    this.artworkService.getArtWorkById(this.id).subscribe({
      next: (data: any) => {
        console.log('data', data)
        this.artWork = data.data;
      },
      error: (err) => {
        console.log('err', err)
      },
      complete: () => {
        this.fetchingData = false;
      }
    })
  }

  purchaseItem(data: any) {
    this.artworkService.addCheckOutItems(data);
    this.router.navigate(['/checkout'])
  }

  addToCart(data: any) {
     // Add the item to the cart here
    // Then update the state to show the "Added" state
    this.isAdded = true;

    // Optional: Reset the button text after some time (e.g., 2 seconds)
    setTimeout(() => {
      this.isAdded = false;
    }, 5000);
    this.artworkService.addCheckOutItems(data);
  }

  navigateToArtist(artist: any) {
    // this.router.navigate([`/profile/${artist.id}`]);
  }
}
