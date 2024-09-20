// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as jsonData from 'src/assets/config.json';
// Your web app's Firebase configuration
export const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const configData:ConfigJson = jsonData;


class ConfigJson{
  geoserver_url: string;
  baseLayer:string;
  baseAtrib:string;
  geo_user:string;
  geo_pass:string;
  cesiumToken:string;
  api_swagger:string;
  longitude:number;
  latitude:number;
  height:number;
  minimunZoomDistance:number;
  maximunZoomDistance:number;
}