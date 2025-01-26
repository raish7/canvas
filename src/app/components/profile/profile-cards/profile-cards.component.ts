import { NgFor } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-cards',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './profile-cards.component.html',
  styleUrl: './profile-cards.component.scss',
})
export class ProfileCardsComponent {
  data = input.required<any>();

  constructor(private router: Router) {}

  navigateToArtworksDetail() {
    this.router.navigate(['artworks', this.data().id]);
  }
}
