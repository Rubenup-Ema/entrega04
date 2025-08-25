import { Routes } from '@angular/router';
import { RoutePaths } from './shared/utils/routes';
import { roleGuard } from './shared/guards/role-guard';

export const routes: Routes = [

    {path: RoutePaths.LOGIN, loadComponent: () => import('./home/login/login').then(m => m.Login) },
     {path: RoutePaths.HOME, 
     loadComponent: () => import('./home/dashboard/dashboard').then(m => m.Dashboard)
    ,
    children: [
      {
        path: RoutePaths.COURSES,
        loadComponent: () => import('./features/course/course').then(m => m.Courses)
      },
      {
        path: RoutePaths.STUDENTS,
        loadComponent: () => import('./features/students/students').then(m => m.Students),
        
      },
      {
        path: RoutePaths.USERS,
        loadComponent: () => import('./features/users/users').then(m => m.Users), canActivate:[roleGuard]
      },
     {
      path: RoutePaths.NOTFOUND,
      loadComponent: () => import('./shared/not-found/not-found').then(m => m.NotFound)
     },
      
      {
        path: '',
        redirectTo: RoutePaths.HOME, 
        pathMatch: 'full'
      }
    ] },

     {path: '', redirectTo: RoutePaths.LOGIN, pathMatch:'full'},
     {path: '**', redirectTo: RoutePaths.LOGIN, pathMatch:'full'}

];
