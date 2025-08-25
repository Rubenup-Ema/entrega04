import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoutePaths } from '../utils/routes';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const role = sessionStorage.getItem("role");
  const router = inject(Router); 
  
  if (role !== 'admin') {

    router.navigate(['/' + RoutePaths.HOME + '/' +RoutePaths.NOTFOUND]);
    return false;

  }

  return true;
};
