import { ActivatedRoute, Router } from '@angular/router';
import { ArtworksService } from './../../services/artworks/artworks.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardSkeletonComponent } from '../../components/skeleton/card-skeleton/card-skeleton.component';
import { FormsModule } from '@angular/forms';
import { toastMixin } from '../../utils/toastMixin';
import { AuthService } from '../../services/auth/auth.service';
import { ProfileAvatarComponent } from "../../components/profile/profile-avatar/profile-avatar.component";
import { ProfileCardsComponent } from "../../components/profile/profile-cards/profile-cards.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardSkeletonComponent, FormsModule, ProfileAvatarComponent, ProfileCardsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileComponent {
  id: any;
  artWork: any;
  userProfile: any;
  featuredArtWorks = [];
  fetchingData = false;
  fetchingProfile = false;
  showEditBtn = false;

  constructor(
    private artworkService: ArtworksService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params['id']; // Access the 'id' parameter from the URL
    });
    this.showEditBtn = this.authService.getCurrentUser().id === Number(this.id);
    this.getArtWork();
    this.getProfile();
  }

  getProfile() {
    this.fetchingProfile = true;
    this.artworkService.getProfile(this.id).subscribe({
      next: (data: any) => {
        this.userProfile = data.data;
      },
      error: (err) => {
        toastMixin('error', 'Failed to fetch profile');
      },
      complete: () => {
        this.fetchingProfile = false;
      },
    });
  }

  getArtWork() {
    this.fetchingData = true;
    this.artworkService.getArtWorkByArtistId(this.id).subscribe({
      next: (data: any) => {
        this.artWork = data.data;
      },
      error: (err) => {
        toastMixin('error', 'Failed to fetch artworks');
      },
      complete: () => {
        this.fetchingData = false;
      },
    });
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
