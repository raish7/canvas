import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { ArtworksService } from '../../../services/artworks/artworks.service';
import { toastMixin } from '../../../utils/toastMixin';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  @Input() comment!: any;
  @Input() artworkId !: number;

  constructor(private authService: AuthService, private artworkService: ArtworksService) {}

  reply() {
    // if (!this.authService.isLoggedIn()) {
    //   this.router.navigate(['/login'], {
    //     queryParams: { routeBack: `/artworks/${this.id}` },
    //   });
    //   return;
    // }
    Swal.fire({
      input: 'textarea',
      inputLabel: 'Add a reply',
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your message';
        }
        return null;
      },
      confirmButtonText: 'Post',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        this.artworkService
          .replyComment({
            content: res.value,
            artwork: this.artworkId,
            author: JSON.parse(localStorage.getItem('user') as any).id,
            parent: this.comment.id
          })
          .subscribe({
            next: (res: any) => {
              if (res.success) {
                if (this.comment.replies.length === 0) {
                  this.comment.replies = [];
                }
                this.comment.replies.push({
                  author: {
                    name: JSON.parse(localStorage.getItem('currProfile') as any)
                      .user.name,
                    id: JSON.parse(localStorage.getItem('currProfile') as any)
                      .user.id,
                    replies: [],
                    parentId: this.comment.id,
                    profile: JSON.parse(localStorage.getItem('currProfile') as any)
                  },
                  ...res.data,
                });
                this.comment.replies = [...this.comment.replies];
                toastMixin('success', 'Comment posted successfully');
              }
            },
            error: (err: any) => {
              console.error('err', err);
              toastMixin('error', 'Failed to post comment');
            },
          });
      }
    });
  }
}
