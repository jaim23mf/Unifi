import { Component, inject } from '@angular/core';
import { StyleService } from 'src/app/style-service/style.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoadingComponent } from '../loading/loading/loading.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  constructor( private style:StyleService, private dialog:MatDialog){}
  files: File[] = [];
  private _snackBar = inject(MatSnackBar);

onSelect(event) {
  console.log(event);
  this.files = [];
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
uploadData(){
  console.log("Click");
  console.log(this.files[0]);

  this.dialog.open(LoadingComponent, {
    panelClass: "hello",
    disableClose: true
  });

  this.style.setStyle(this.files[0]).subscribe(
    (res) => {
      this.dialog.closeAll();
    console.log(res);
    if(res == null){
      this.files = [];
      this._snackBar.open('Saved', 'Close', {
        duration: 3000
      });
    }
    else {

      this._snackBar.open(res, 'Close', {
        duration: 3000
      });
    }
    
   }
  
  );
}


}
