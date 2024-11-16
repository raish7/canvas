import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-artworks-detail',
  standalone: true,
  imports: [NgFor],
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
  ngOnInit() {
    console.log('hree')
  }
}
