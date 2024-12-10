import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  const router = inject(Router);

  console.log('routeee', route)
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false; 
  }
  return true;
};
