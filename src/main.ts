import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Ion } from 'cesium';
import { configData } from './url-config';
window['CESIUM_BASE_URL'] = '/assets/cesium/';
Ion.defaultAccessToken = configData.cesiumToken ;

//Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZjA5Mzc4Mi02OTZjLTRjYjktYjdjOS03ZGRhNzRkNDZlYWQiLCJpZCI6MjE0MjE5LCJpYXQiOjE3MTUzMjY0MjN9.CnF2olu7l6Koo57ZO2h6lU2uIrRNCx1NKlpb1Mn_5G4";
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
