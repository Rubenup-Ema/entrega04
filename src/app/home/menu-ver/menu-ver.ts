import { Component } from '@angular/core';
import { RoutePaths } from '../../shared/utils/routes';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-menu-ver',
  imports: [MatIcon],
  templateUrl: './menu-ver.html',
  styleUrl: './menu-ver.scss'
})
export class MenuVer {


  constructor(private router:Router) {


  }

   menu(id: number) {

      switch (id) {

         case 1: 
         this.router.navigate(['/' + RoutePaths.HOME + '/' + RoutePaths.COURSES ])
         break;

         case 2: 
         this.router.navigate(['/' + RoutePaths.HOME + '/' + RoutePaths.STUDENTS ])
         break;

         case 3: 
         this.router.navigate(['/' + RoutePaths.HOME + '/' + RoutePaths.USERS ])
         break;

         case 4: 
         this.router.navigate(['/'+ RoutePaths.LOGIN ])
         break;


      }



    }

}
