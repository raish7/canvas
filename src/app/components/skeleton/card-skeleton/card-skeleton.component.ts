import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [NgFor],
  templateUrl: './card-skeleton.component.html',
  styleUrl: './card-skeleton.component.scss'
})
export class CardSkeletonComponent {

}
