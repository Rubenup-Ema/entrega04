import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

  user = "";

  constructor() {

     this.user = "" + sessionStorage.getItem("user") + " / " + sessionStorage.getItem("role");


  }

}
