import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Color, ImageryLayer, OpenStreetMapImageryProvider, Resource, SceneMode, SkyBox, Terrain, Viewer , WebMapServiceImageryProvider, WebMercatorProjection} from 'cesium';
import { CesiumService } from './cesium-service/cesium.service';
import { Layer } from './models/layer_model';
import { configData } from 'src/url-config';

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  viewer: Viewer ;
  parameters;
  constructor(private el: ElementRef, private cesiumService: CesiumService, private renderer: Renderer2) {
  }
  ngAfterViewInit(): void {
    this.viewer = this.cesiumService.CreateCesiumViewer(this.el);
    this.viewer.forceResize();
  }
    ngOnInit(): void {}
    addLayer(layers:Layer[]){

      this.parameters = {
        service:"WMS",
        version: '1.1.0',
        format:"image/png"
        
      }

      console.log("aaaa set layer") ;
      layers.forEach(element => {
        let Layeroption = {
          url: configData.geoserver_url, //"http://10.0.0.64:12092/geoserver/rest/workspaces/TESTZZZ/coveragestores/TESTCOVERAGESTORE/coverages/",
          layers:element.name,
          parameters: this.parameters
      };
      let nLayer = new ImageryLayer(new WebMapServiceImageryProvider(Layeroption));
      //nLayer.alpha=0.0;
      nLayer.colorToAlpha = Color.WHITE;

      let elem = this.cesiumService.listLayer.get(element.name);
      //let layers = this.viewer.imageryLayers.get(this.viewer.imageryLayers.indexOf(elem));
      if(elem == undefined){
        //this.viewer.imageryLayers.add(nLayer);
        this.cesiumService.listLayer.set(element.name,nLayer);
      }
      });
      

    }

    rebuildMap(){
      this.cesiumService.listLayer.forEach(la=>{
        console.log("-->" + la);
        this.viewer.imageryLayers.add(la)

      });
    }

    drawLayer(name:string){
      let elem = this.cesiumService.listLayer.get(name);
      if(elem!= undefined){
        let layers = this.viewer.imageryLayers.get(this.viewer.imageryLayers.indexOf(elem));
        if(layers == undefined)
        this.viewer.imageryLayers.add(elem);
        else
        layers.alpha = 1.0;
      }
    }

    removeLayer(name:string){
      let elem = this.cesiumService.listLayer.get(name);
      if(elem!= undefined){
        this.viewer.imageryLayers.remove(elem,false);
      }
    }

    /*showLayer(name:string){
      let elem = this.cesiumService.listLayer.get(name);
      let layers = this.viewer.imageryLayers.get(this.viewer.imageryLayers.indexOf(elem));
      layers.alpha = 1.0;
      console.log("Layers..." + layers);
    }

    hideLayer(name:string){
      let elem = this.cesiumService.listLayer.get(name);
      let layers = this.viewer.imageryLayers.get(this.viewer.imageryLayers.indexOf(elem));
      layers.alpha = 0.0;
      console.log("Layers..." + layers);
    }*/
}
