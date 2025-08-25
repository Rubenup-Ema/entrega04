import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Message {

  constructor(private snackBar: MatSnackBar) {}

  show(texto: string): void {
    this.snackBar.open(`${texto} ✅`, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
  
}
