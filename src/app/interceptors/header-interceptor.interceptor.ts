import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const headerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('res', req);
  const authToken = inject(AuthService).getToken();
  const newReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
  return next(newReq);
};
