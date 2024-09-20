import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageryLayer, SceneMode, Viewer, WebMapServiceImageryProvider } from 'cesium';
import { CesiumService } from 'src/app/cesium-service/cesium.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { GeoserverService } from 'src/app/geoserver-service/geoserver.service';
import { LoginService } from 'src/app/login-service/login.service';
import { GeoInfo } from 'src/app/models/geoInfo';
import { StyleService } from 'src/app/style-service/style.service';
import { Style, } from 'src/app/models/style_model';
import { catchError, of } from 'rxjs';
import { LayerService } from 'src/app/layer-service/layer.service';
import { Layer } from 'src/app/models/layer_model';
import {  CesiumDirective} from 'src/app/cesium.directive';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  
})
export class MapComponent implements OnInit {
  @ViewChild(CesiumDirective) cesiumDirective:CesiumDirective; 
  layers:Layer[] = []; 
  layerlist:Layer[] = [];
  styles:Style[] = [];
  viewer: Viewer ;

datos = [
  {name:"nombre della stazione",visible:true},
  {name:"nombre della stazione",visible:true},
  {name:"nombre della stazione",visible:true},
  {name:"nombre della stazione",visible:true},
  {name:"nombre della stazione",visible:true},
  {name:"nombre della stazione",visible:true},
  {name:"nombre della stazione",visible:true},
  {name:"nombre della stazione",visible:true},
  {name:"nombre della stazione",visible:true},
  {name:"nombre della stazione",visible:true}
]

isDatos = false;
isMap = true;
isLayer = false;
isUpload = false;

    constructor(
      private login: LoginService ,
       private cesium:CesiumService , 
       private geo:GeoserverService , 
       private style:StyleService , 
       private layer:LayerService,
      private el: ElementRef){}

    ngOnInit(): void{
      /*this.login.getRole().then((role) =>{
        console.log("Role 1 " , role);
       });
*/
       /*this.geo.getPrivateList().subscribe((json) => {
        console.log(json);
        if(json) {
          let lista:GeoInfo = json as GeoInfo;
          console.log(lista);
        }

       });*/

       this.style.getStyles().subscribe((json) =>{
          console.log("Estilos...");
          console.log(json);
          this.styles = json.styles.style;
       });

       this.refreshList();
    }


    refreshList(){
      this.layers = [];
      this.layer.getAll().subscribe((json) =>{
        console.log(json.layers);
        if(json.layers != null){
        this.layerlist = json.layers.layer;
        this.layerlist.forEach(s => {
          let l:Layer = new Layer();
          l.name = s.name.split(":")[1];
          l.workspace = s.name.split(":")[0];
          l.visible = false;
          this.layers.push(l);
        });
        this.refreshMap();
      }
       });
    }

    refreshMap(){
      this.cesiumDirective.addLayer(this.layerlist);
    }

    buttonClick(tipo:Number){
      this.isLayer = false;
      this.isDatos = false;
      this.isMap = false;
      this.isUpload = false;
      switch(tipo){
        case 0:
          this.isMap = true;
          //this.cesiumDirective.rebuildMap();
        break;
        case 1:
          this.isLayer = true;
          break;
        case 2:
          this.isUpload = true;
          break;
        case 3: 
          this.isDatos = true;
          break;
        default:
          this.isMap=true;
          break;
      }

    }

    removeItem(el:Object){
      console.log(el);
    }

    setVisibility(state:Boolean, item:Layer){
      if(state){
        this.cesiumDirective.drawLayer(item.workspace+":"+item.name);
        //this.cesiumDirective.showLayer(item.workspace+":"+item.name);
      }
      else{
        this.cesiumDirective.removeLayer(item.workspace+":"+item.name);
        //this.cesiumDirective.hideLayer(item.workspace+":"+item.name);
      }
    }


    set3d(){
      this.cesium.viewer.scene.mode = SceneMode.SCENE3D;
    }

    set2d(){
      this.cesium.viewer.scene.mode = SceneMode.SCENE2D;
    }

    drop(event: CdkDragDrop<Object[]>) {
      moveItemInArray(this.layers, event.previousIndex, event.currentIndex);
    }

    selectLayer(event){
      console.log(event);
    }
}
