import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/landing/header/header.component';
import { FeaturedArtworksComponent } from './components/landing/featured-artworks/featured-artworks.component';
import { ChooseUsComponent } from './components/landing/choose-us/choose-us.component';
import { FooterComponent } from './components/landing/footer/footer.component';
import { initFlowbite } from 'flowbite';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ArtworksService } from './services/artworks/artworks.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'digital-art';
  showCartButton = false;
  cartItems = [];
  constructor(private artworkService : ArtworksService, private router: Router, private route: ActivatedRoute, public authService: AuthService) {}
  ngOnInit() {
    initFlowbite();
    this.artworkService.checkoutItems.subscribe((res: any) => {
      this.cartItems = res;
      this.cartItems = [...this.cartItems];
      this.showCartButton = true;
    })
  }

  routeToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
