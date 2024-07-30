// import { HttpInterceptorFn } from '@angular/common/http';
// import { AuthService } from './services/auth.service';
// import { inject } from '@angular/core';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

//   const authService = inject(AuthService);
//   const token = authService.getToken();

//   if (token) {
//     const clonedRequest = req.clone({
//       withCredentials: true,
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return next(clonedRequest);
//   }
//   return next(req);
// };

import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const clonedRequest = req.clone({
    withCredentials: true, 
    setHeaders: token ? {
      Authorization: `Bearer ${token}`
    } : {}
  });

  return next(clonedRequest);
};
