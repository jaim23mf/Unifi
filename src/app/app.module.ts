import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { firebaseConfig } from 'src/url-config';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { FormsModule } from '@angular/forms';
import { CesiumDirective } from './cesium.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import { LayerComponent } from './components/layer/layer.component';
import { UploadComponent } from './components/upload/upload.component';
import { DatosComponent } from './components/datos/datos.component';
import {MatCardModule} from '@angular/material/card'; 
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatInputModule} from '@angular/material/input'; 
import { HighchartsChartModule } from 'highcharts-angular';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        MapComponent,
        CesiumDirective,
        LayerComponent,
        UploadComponent,
        DatosComponent
    ],
    bootstrap: [AppComponent] ,
    imports: [
        BrowserModule,
        HighchartsChartModule,
        FormsModule,
        AppRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        CdkDropList,
        CdkDrag,
        MatSliderModule,
        MatExpansionModule,
        MatCardModule,
        MatInputModule,
        NgxDropzoneModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDialogModule,
        MatProgressSpinnerModule        
        
    ], providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => {
            const auth = getAuth();
            if (location.hostname === 'localhost') {
                connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
            }
            return auth;
        }),
        provideMessaging(() => {
            return getMessaging();
        })
    ] })
export class AppModule { }
