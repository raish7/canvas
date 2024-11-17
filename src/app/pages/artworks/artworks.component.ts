import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ArtworksService } from '../../services/artworks/artworks.service';
import { CardSkeletonComponent } from "../../components/skeleton/card-skeleton/card-skeleton.component";
interface Image {
  url: string;
  alt: string;
}

@Component({
  selector: 'app-artworks',
  standalone: true,
  imports: [NgFor, NgIf, CardSkeletonComponent],
  templateUrl: './artworks.component.html',
  styleUrl: './artworks.component.scss'
})
export class ArtworksComponent {
  constructor(private router: Router, private artworkService: ArtworksService) {}
  images: Image[] = [];
  sortBy = 'Price'
  hideSortDropdown = true;
  artworksData: any[] = [];
  fetchingData = false;
  artworks = [
    {
      id: 1,
      title: "Framed, Giant Hendrix",
      artist: "Shepard Fairey",
      year: 2019,
      gallery: "StolenSpace Gallery",
      price: "US$10,500–US$15,500",
      image: "https://c4.wallpaperflare.com/wallpaper/424/574/561/vincent-van-gogh-starry-night-the-starry-nights-wallpaper-preview.jpg",
      tags: ["Print", "Limited Edition"],
    },
    {
      id: 2,
      title: "Big Brother is Watching You",
      artist: "Shepard Fairey",
      year: 2019,
      gallery: "StolenSpace Gallery",
      price: "US$10,500–US$15,500",
      image: "https://i.pinimg.com/564x/e6/b8/62/e6b8624601a0b3b9e64f3c1a6fbdacc3.jpg",
      tags: ["Print", "Rare"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://c4.wallpaperflare.com/wallpaper/424/574/561/vincent-van-gogh-starry-night-the-starry-nights-wallpaper-preview.jpg",
      tags: ["Unique", "Sculpture"],
    },
    {
      id: 1,
      title: "Framed, Giant Hendrix",
      artist: "Shepard Fairey",
      year: 2019,
      gallery: "StolenSpace Gallery",
      price: "US$10,500–US$15,500",
      image: "https://c4.wallpaperflare.com/wallpaper/424/574/561/vincent-van-gogh-starry-night-the-starry-nights-wallpaper-preview.jpg",
      tags: ["Print", "Limited Edition"],
    },
    {
      id: 2,
      title: "Big Brother is Watching You",
      artist: "Shepard Fairey",
      year: 2019,
      gallery: "StolenSpace Gallery",
      price: "US$10,500–US$15,500",
      image: "https://i.pinimg.com/564x/e6/b8/62/e6b8624601a0b3b9e64f3c1a6fbdacc3.jpg",
      tags: ["Print", "Rare"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://c4.wallpaperflare.com/wallpaper/424/574/561/vincent-van-gogh-starry-night-the-starry-nights-wallpaper-preview.jpg",
      tags: ["Unique", "Sculpture"],
    },
    {
      id: 2,
      title: "Big Brother is Watching You",
      artist: "Shepard Fairey",
      year: 2019,
      gallery: "StolenSpace Gallery",
      price: "US$10,500–US$15,500",
      image: "https://i.pinimg.com/564x/e6/b8/62/e6b8624601a0b3b9e64f3c1a6fbdacc3.jpg",
      tags: ["Print", "Rare"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://c4.wallpaperflare.com/wallpaper/424/574/561/vincent-van-gogh-starry-night-the-starry-nights-wallpaper-preview.jpg",
      tags: ["Unique", "Sculpture"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://www.singulart.com/blog/wp-content/uploads/2023/10/Portrait-of-a-Florentine-Nobleman.jpg",
      tags: ["Unique", "Sculpture"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://www.artst.org/wp-content/uploads/2022/02/Self-Portrait-with-Grey-Felt-Hat-Vincent-van-Gogh.jpg",
      tags: ["Unique", "Sculpture"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://i.pinimg.com/550x/07/31/39/073139a573876d25d8915dc9430432c6.jpg",
      tags: ["Unique", "Sculpture"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://t4.ftcdn.net/jpg/00/76/80/97/360_F_76809767_Gb6A91Jm9DvdFe6UuUHQkzhcUyYjZCJf.jpg",
      tags: ["Unique", "Sculpture"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRxHigIcKGirJ_G_wb8kAsPD7K67WyJ7U7rrNruw2XHQ4DttNwE25Z-fWudKY_xmOGz4g&usqp=CAU",
      tags: ["Unique", "Sculpture"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://www.ugallery.com/cdn/shop/files/homepage-usp-photo-2_720x.jpg?v=1667476652",
      tags: ["Unique", "Sculpture"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://www.artst.org/wp-content/uploads/2022/02/Self-Portrait-with-Grey-Felt-Hat-Vincent-van-Gogh.jpg",
      tags: ["Unique", "Sculpture"],
    },
    {
      id: 3,
      title: "Sculptural Piece",
      artist: "Will Cotton",
      year: 2023,
      price: "US$18,000",
      image: "https://i.pinimg.com/550x/07/31/39/073139a573876d25d8915dc9430432c6.jpg",
      tags: ["Unique", "Sculpture"],
    },

  ]

  ngOnInit() {
    this.fetchingData = true;
    this.artworkService.getArtWorks().subscribe({
      next: (data: any) => {
        console.log('data', data)
        this.artworksData = data.data
      },
      error: (err) => {
        console.log('err', err)
      },
      complete: () => {
        this.fetchingData = false;
      }
    })
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

  navigateToArtworksDetail(image: any) {
    this.router.navigate(['artworks', image.id]);
  }

  sortByPrice(value: string) {
    // this.hideSortDropdown = false;
      this.sortBy = value;
  }
}
