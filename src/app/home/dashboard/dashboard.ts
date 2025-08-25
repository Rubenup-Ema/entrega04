import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Main } from '../main/main';
import { Breadcrumb } from "../breadcrumb/breadcrumb";
import { MatIcon } from '@angular/material/icon';
import { MenuVer } from "../menu-ver/menu-ver";
import { RoutePaths } from '../../shared/utils/routes';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, CommonModule, Main, Breadcrumb, MenuVer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {


    constructor(private router:Router) {

    }

    ngOnInit(): void {
      
      const user = "" + sessionStorage.getItem("user");

      if (user.trim() === "") {

        this.router.navigate(['/'+ RoutePaths.LOGIN]);

      }

    }

   

}
