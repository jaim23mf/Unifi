import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayerService } from 'src/app/layer-service/layer.service';
import { Layer, LayerJson, Layers } from 'src/app/models/layer_model';
import { Observable } from 'rxjs';
import { WorkspaceService } from 'src/app/workspace-service/workspace.service';
import { Workspace } from 'src/app/models/worksapce_model';
import { StyleService } from 'src/app/style-service/style.service';
import { Style } from 'src/app/models/style_model';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading/loading.component';
import { MapComponent } from '../map/map.component';
import { CesiumDirective } from 'src/app/cesium.directive';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css'],
})


export class LayerComponent {
  @ViewChild(CesiumDirective) cesiumDirective:CesiumDirective; 

  public selected:string;
  public name:string;
  public title:string;
  public description:string;
  public store:string;
  public workspaces:string[];
  public styles:Style[];
  public selectedStyles:Style[]=[];
  public selectedWorkspace:string;
  /*listaGrupos= [
    {
      nombre:"G1",
      sub:[
        {
          nombre:"SUB1",
          layers:[
            {nombre:"Layer1"},
            {nombre:"Layer2"},
            {nombre:"Layer3"},
            {nombre:"Layer4"},
            {nombre:"Layer5"}
          ]
        },
        {
          nombre:"SUB2",
          layers:[
            {nombre:"Layer1"},
            {nombre:"Layer2"},
            {nombre:"Layer3"}
          ]
        },
        {
          nombre:"SUB3",
          layers:[
            {nombre:"Layer1"},
          ]
        }
      ]
    },
    {
      nombre:"G2",
      sub:[
        {
          nombre:"SUB1",
          layers:[
            {nombre:"Layer1"},
            {nombre:"Layer2"},
            {nombre:"Layer3"},
            {nombre:"Layer4"},
            {nombre:"Layer5"}
          ]
        },
        {
          nombre:"SUB3",
          layers:[
            {nombre:"Layer1"},
          ]
        }
      ]
    },    {
      nombre:"G3",
      sub:[
        {
          nombre:"SUB2",
          layers:[
            {nombre:"Layer1"},
            {nombre:"Layer2"},
            {nombre:"Layer3"}
          ]
        },
        {
          nombre:"SUB3",
          layers:[
            {nombre:"Layer1"},
          ]
        }
      ]
    },    {
      nombre:"G4",
      sub:[
        {
          nombre:"SUB1",
          layers:[
            {nombre:"Layer1"},
            {nombre:"Layer2"},
            {nombre:"Layer3"},
            {nombre:"Layer4"},
            {nombre:"Layer5"}
          ]
        },
        {
          nombre:"SUB2",
          layers:[
            {nombre:"Layer1"},
            {nombre:"Layer2"},
            {nombre:"Layer3"}
          ]
        }
      ]
    }
  ]*/

  constructor(private layer:LayerService , private work:WorkspaceService , private up_style:StyleService, private dialog:MatDialog , private map:MapComponent){}
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void{
     /*this.layer.getAll().subscribe((json) =>{
      console.log(json.layers);
      let i:Layer[] = json.layers.layer;
      console.log(i);
     });*/

     this.styles = [];
     this.up_style.getStyles().subscribe((json) =>{
      console.log("Estilos...");
      console.log(json);
      this.styles = json.styles.style;
      /*let i:Style[] = json.styles.style;
      console.log(i);
      i.forEach(s => {
        this.styles.push(s);
      });*/
   });

     this.workspaces = [];
     this.work.getWorkspaces().subscribe((json) =>{
      console.log(json.workspaces);
      let i:Workspace[] = json.workspaces.workspace;
      console.log(i);
      i.forEach(s => {
        this.workspaces.push(s.name);
      });

     });

     //this.cesium.plotPoints("cesium");
  }

  files: File[] = [];

onSelect(event) {
  console.log(event);
  this.files = [];
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

  upload(){
    let ljson:LayerJson = new LayerJson();

    ljson.name = this.name;
    ljson.title = this.title;
    ljson.description = this.description;
    ljson.styles = this.selectedStyles;
    ljson.workspace = this.selectedWorkspace;
    if(this.name == undefined || this.name==null ||this.name.trim() == ""){
      this.error("Name");
      return;
    }
    if(this.title == undefined ||this.title == null ||this.title.trim() == ""){
      this.error("Title");
      return;
    }
    /*if(this.store == undefined ||this.store == null ||this.store.trim() == ""){
      this.error("Store");
      return;
    }*/
    if(this.selectedWorkspace == undefined ||this.selectedWorkspace == null ||this.selectedWorkspace.trim() == ""){
      this.error("Workspace");
      return;
    }

    this.dialog.open(LoadingComponent, {
      panelClass: "hello",
      disableClose: true
    });

    switch(this.selected){
      case "option1":
        this.layer.postDataStore(this.files[0],ljson).subscribe( (res) => {
          this.dialog.closeAll();
          if(res == null){
            this.files = [];
            this._snackBar.open('Saved', 'Close', {
              duration: 3000
            });
            this.sendMessage(ljson);
          }
          else {
            this._snackBar.open(res, 'Close', {
              duration: 3000
            });
          }
    });
        break;
      case "option2":
        this.layer.postCoverageStore(this.files[0],ljson).subscribe( (res) => {
          this.dialog.closeAll();
          if(res == null){
            this.files = [];
            this._snackBar.open('Saved', 'Close', {
              duration: 3000
            });
            this.sendMessage(ljson);
          }
          else {
      
            this._snackBar.open(res, 'Close', {
              duration: 3000
            });
          }
        });
        break;
      default:
        this._snackBar.open("Error uploading", 'Close', {
          duration: 3000
        });
        break;
    }
  }

changeWorkspace(value){
  //console.log(value);
  this.selectedWorkspace=value;
}

changeStyle(value){
  //console.log(value);
  this.selectedStyles=value;
}
sendMessage(ljson:LayerJson) {

  this.map.refreshList();
}

error(value:string){
  this._snackBar.open(value+ " must be filled", 'Close', {
    duration: 3000
  });
}

}


