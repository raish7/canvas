import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isScrolled = true;
  isAuthenticated = false;
  subscriptions: Subscription[] = [];
  // @HostListener('window:scroll', [])
  menuOpen = false;
  currProfile: any;
  // onWindowScroll() {
  //   // Check if the page is scrolled down by a certain amount (e.g., 50px)
  //   this.isScrolled = window.scrollY > 50;
  // }
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.currProfile = JSON.parse(localStorage.getItem("currProfile") || '{}');
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goToHome() {
    this.router.navigate(['/'])
  }

  logout() {
    Swal.fire({
      title: "Are you sure to logout?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.isAuthenticated = false;
        window.location.href = '/';
      }
    });
    
  }

  routeToLogin() {
    this.router.navigate(['/login']);
  }
}
