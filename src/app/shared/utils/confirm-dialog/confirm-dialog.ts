import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogActions, MatDialogContent, MatButton],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss'
})
export class ConfirmDialog {

    constructor( public dialogoRef: MatDialogRef<ConfirmDialog>,
      @Inject(MAT_DIALOG_DATA) public data: {mensaje: string}) {

     

    }

    onConfirm() {

      this.dialogoRef.close(true);

    }

     onCancel() {

      this.dialogoRef.close(false);

    }


}
