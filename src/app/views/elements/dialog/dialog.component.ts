import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fp-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
   values: string[]
   constructor(
      public dialogRef: MatDialogRef<any>,
      @Inject(MAT_DIALOG_DATA) public data
   ) {
      this.values = data.fields.map(() => "")
   }

   onNoClick(): void {
      this.dialogRef.close();
   }

}
