import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal, WritableSignal } from '@angular/core';
import { ArtworksService } from '../../services/artworks/artworks.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { DetailPageSkeletonComponent } from '../../components/skeleton/detail-page-skeleton/detail-page-skeleton.component';
import { AuthService } from '../../services/auth/auth.service';
import { toastMixin } from '../../utils/toastMixin';
import Swal from 'sweetalert2';

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
  comments: any[] = [];
  // comments = computed(() => {
  //   return this.artWork()?.comments;
  // })

  constructor(
    private artworkService: ArtworksService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
    });
    this.getArtWork();
  }
  getArtWork() {
    this.fetchingData = true;
    this.artworkService.getArtWorkById(this.id).subscribe({
      next: (data: any) => {
        this.artWork = data.data;
        this.comments = this.artWork?.comments;
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
    this.router.navigate([`/profile/${artist.id}`]);
  }

  addComment() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { routeBack: `/artworks/${this.id}` },
      });
      return;
    }
    Swal.fire({
      input: "textarea",
      inputLabel: "Add a comment",
      // inputPlaceholder: `Add a comment...`,
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      inputValidator: (value) => {
        if (!value) {
          return "Please enter your message";
        }
        return null;
      },
      confirmButtonText: "Post",
      cancelButtonText: "Cancel",
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.artworkService.addComment({
          content: res.value,
          artwork: this.id,
          author: JSON.parse(localStorage.getItem('user') as any).id
        }).subscribe({
          next: (res: any) => {
            if (res.success) {
              this.comments.push({
                author: {
                  name: JSON.parse(localStorage.getItem('currProfile') as any).user.name,
                  id: JSON.parse(localStorage.getItem('currProfile') as any).user.id
                },
                ...res.data
              });
              this.comments = [...this.comments];
              toastMixin("success", "Comment posted successfully");
            }
          },
          error: (err: any) => {
            console.error('err', err)
            toastMixin("error", "Failed to post comment");
          }
        })   
      }
    })
  }
}
