import { ActivatedRoute, Router } from '@angular/router';
import { ArtworksService } from './../../services/artworks/artworks.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardSkeletonComponent } from '../../components/skeleton/card-skeleton/card-skeleton.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor, CardSkeletonComponent, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileComponent {
  id: any;
  artWork: any;
  userProfile: any;
  featuredArtWorks = [];
  fetchingData = false;

  constructor(private artworkService: ArtworksService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      console.log('Test ID:', this.id);
    });
    this.getArtWork();
    this.getProfile();
  }

  getProfile() {
    this.artworkService.getProfile(this.id).subscribe({
      next: (data: any) => {
        console.log('profile', data)
        this.userProfile = data.data;
        console.log('profile data', this.userProfile)
      },
      error: (err) => {
        console.log('err', err)
      }
    })
  }

  getArtWork() {
    this.fetchingData = true;
    this.artworkService.getArtWorkByArtistId(this.id).subscribe({
      next: (data: any) => {
        console.log('data', data)
        this.artWork = data.data;
        console.log('artwork data', this.artWork)
      },
      error: (err) => {
        console.log('err', err)
      },
      complete: () => {
        this.fetchingData = false;
      }
    })
  }

  navigateToArtworksDetail(data: any) {
    this.router.navigate(['artworks', data.id]);
  }

}
