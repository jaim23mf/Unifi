import { ElementRef, Injectable } from '@angular/core';
import { Cartesian3, Credit, Ellipsoid, ImageryLayer, Ion, OpenStreetMapImageryProvider, SceneMode, SkyBox, Terrain, Viewer, WebMapTileServiceImageryProvider, WebMercatorProjection } from 'cesium';
import { configData } from 'src/url-config';
//import * as Cesium from '../assets/js/Cesium.js';
//Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MWZlOTZjMy1iYjhiLTRkYjktOWEyYS0xYjllYWM4NmQ3YjYiLCJpZCI6ODM1MzksImlhdCI6MTY2MTU0NTg0MX0.PBHIiiQPO0_kfthCfRxp4VVGlhFZp4BMKIeILBwYuqk";
@Injectable({
  providedIn: 'root'
})
export class CesiumService {constructor() { }
  public viewer: Viewer | null;
  public listLayer = new Map<string, any>();


  public CreateCesiumViewer(el: ElementRef){

    /*this.viewer =  new Viewer(el.nativeElement, {
      // Start in Columbus Viewer
      sceneMode: SceneMode.SCENE2D,
      // Use Cesium World Terrain
      terrain: Terrain.fromWorldTerrain(),
      // Hide the base layer picker
      baseLayerPicker: false,
      // Use OpenStreetMaps
      baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
        url: "https://tile.openstreetmap.org/"
      })),
      timeline:false,
      animation:false,
      fullscreenButton:false,
      navigationHelpButton:false,
      infoBox:false,
      geocoder:false,
      homeButton:false,
      projectionPicker:false,
      sceneModePicker:false,
      // Show Columbus View map with Web Mercator projection
      mapProjection: new WebMercatorProjection()
    });*/
    this.viewer = new Viewer(el.nativeElement, {
      mapProjection: new WebMercatorProjection(),
      baseLayer: this.getBaseLayer({
      "url": configData.baseLayer,
      "attribution": configData.baseAtrib
    }),
      sceneMode: SceneMode.SCENE2D,
      imageryProviderViewModels: [],
      baseLayerPicker: false,
      geocoder: false,
      timeline: false,
      shouldAnimate: false,
      animation: false,
      homeButton: false,
      navigationInstructionsInitiallyVisible: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      fullscreenButton: false,
      infoBox: false,
      terrainProviderViewModels: [],
      selectionIndicator: false
    });
    //this.goToPositionSetted(settingObj.cesiumConfig.location);
    //this.handler();

    this.viewer.camera.setView({
      destination : Cartesian3.fromDegrees(
          configData.longitude,
          configData.latitude,
          configData.height
      )
  });

    this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = configData.minimunZoomDistance;
    this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = configData.maximunZoomDistance;
    //this.loader = this.createLoaderHandler();
    console.log(this.viewer);
    return this.viewer;
  }

  
  public getBaseLayer(tilelayer: any): ImageryLayer {
    const baseLayer = new ImageryLayer(
      new WebMapTileServiceImageryProvider({
        url: tilelayer.url + '{TileMatrix}/{TileCol}/{TileRow}.png',
        layer: 'carto-light',
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'default',
        maximumLevel: 16,
        credit: new Credit(tilelayer.attribution),
      })
    );

    return baseLayer
}
  



}