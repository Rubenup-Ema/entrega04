import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Main } from '../main/main';
import { Breadcrumb } from "../breadcrumb/breadcrumb";
import { MatIcon } from '@angular/material/icon';
import { MenuVer } from "../menu-ver/menu-ver";
import { RoutePaths } from '../../shared/utils/routes';
import { State, Store } from '@ngrx/store';
import { selectLogged } from '../../ngrx/auth/auth.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, CommonModule, Main, Breadcrumb, MenuVer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

   logged: Boolean=false;

    constructor(private router:Router, private store:Store) {

    }

    ngOnInit(): void {
      
      this.isLogged();

     

    }

   
   isLogged() {

    this.store.select(selectLogged).subscribe({

      next: (value:Boolean) => {

        this.logged = value;

         if (!this.logged) {

            this.router.navigate(['/'+ RoutePaths.LOGIN]);

          }

      }

    })

   }

}
