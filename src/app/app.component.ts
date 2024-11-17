import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {NgFor} from '@angular/common';
import { HeaderComponent } from './components/landing/header/header.component';
import { FeaturedArtworksComponent } from './components/landing/featured-artworks/featured-artworks.component';
import { ChooseUsComponent } from './components/landing/choose-us/choose-us.component';
import { FooterComponent } from './components/landing/footer/footer.component';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'digital-art';
  ngOnInit() {
    initFlowbite();
  }
}
