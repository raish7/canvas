import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isScrolled = true;
  // @HostListener('window:scroll', [])
  menuOpen = false;
  // onWindowScroll() {
  //   // Check if the page is scrolled down by a certain amount (e.g., 50px)
  //   this.isScrolled = window.scrollY > 50;
  // }
  constructor(private router: Router) {}
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goToHome() {
    this.router.navigate(['/'])
  }
}
