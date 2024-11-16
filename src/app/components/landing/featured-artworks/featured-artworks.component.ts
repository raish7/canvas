import { Component } from '@angular/core';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-featured-artworks',
  standalone: true,
  imports: [NgFor],
  templateUrl: './featured-artworks.component.html',
  styleUrl: './featured-artworks.component.scss'
})
export class FeaturedArtworksComponent {
  artworks = [
    {
      image: 'https://c4.wallpaperflare.com/wallpaper/424/574/561/vincent-van-gogh-starry-night-the-starry-nights-wallpaper-preview.jpg',
      title: 'Artistic Masterpiece 1',
      artist: 'Artist Name 1',
      price: 299.99,
    },
    {
      image: 'https://artevenue.com/static/image_data/POD/images/49_3CM4353_lowres.jpg',
      title: 'Artistic Masterpiece 2',
      artist: 'Artist Name 2',
      price: 499.99,
    },
    {
      image: 'https://artevenue.com/static/image_data/POD/images/33_V674D_lowres.jpg',
      title: 'Artistic Masterpiece 3',
      artist: 'Artist Name 3',
      price: 199.99,
    },
  ];
}
