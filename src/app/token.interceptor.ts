// import { HttpInterceptorFn } from '@angular/common/http';
// import { AuthService } from './services/auth.service';
// import { inject } from '@angular/core';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
//   const token = authService.getToken();

//   const clonedRequest = req.clone({
//     withCredentials: true,
//     // setHeaders: token ? {
//     //   Authorization: `Bearer ${token}`
//     // } : {}
//   });

//   return next(clonedRequest);
// };

import { HttpInterceptorFn } from '@angular/common/http'
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  req = req.clone(
    { withCredentials: true }
  )
  return next(req)
}
