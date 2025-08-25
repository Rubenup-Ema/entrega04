import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../../ngrx/auth/auth.selectors';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

  user!: string;

  constructor(private store:Store) {

      this.store.select(selectUser).subscribe({

        next: (value:string) => {
          this.user = value;
        },


      }

        

     )

  }

}
