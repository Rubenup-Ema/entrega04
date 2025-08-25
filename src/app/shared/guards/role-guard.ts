import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoutePaths } from '../utils/routes';
import { Store } from '@ngrx/store';
import { selectAdmin } from '../../ngrx/auth/auth.selectors';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router); 
  const store = inject(Store);

  let isAdmin = "user";


    store.select(selectAdmin).subscribe({

      next: (value:string | null) => {

        isAdmin = "" + value;

      }

    })

  if (isAdmin !== "admin") {

    router.navigate(['/' + RoutePaths.HOME + '/' +RoutePaths.NOTFOUND]);
    return false;

  }

  return true;
};
