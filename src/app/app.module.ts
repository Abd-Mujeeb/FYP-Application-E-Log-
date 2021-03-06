import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule,  FirestoreSettingsToken} from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiceWorkerModule } from '@angular/service-worker';

import firebaseConfig from './firebase';
import { HttpModule } from '@angular/http'


import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { StudentService } from './services/user/student.service';
import { ImageModalPageModule } from './pages/image-modal/image-modal.module';

import { NgCalendarModule } from 'ionic2-calendar';

import { PapaParseModule } from 'ngx-papaparse';
import { EditpbsupervisorModalPageModule } from './pages/editpbsupervisor-modal/editpbsupervisor-modal.module';
import { SelectstudentModalPageModule } from './pages/selectstudent-modal/selectstudent-modal.module';
import { PbStudentlistModalPageModule } from './pages/pb-studentlist-modal/pb-studentlist-modal.module';
import { InfoAdminModalPageModule } from './pages/modal/info-admin-modal/info-admin-modal.module';
import { InfoGcModalPageModule } from './pages/modal/info-gc-modal/info-gc-modal.module';

import { IonicStorageModule } from '@ionic/storage';
import { GcStudentlistModalPageModule } from './pages/gc-studentlist-modal/gc-studentlist-modal.module';


firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ImageModalPageModule,
    EditpbsupervisorModalPageModule,
    SelectstudentModalPageModule,
    PbStudentlistModalPageModule,
    GcStudentlistModalPageModule,
    InfoAdminModalPageModule,
    InfoGcModalPageModule,
    FormsModule,
    PapaParseModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireAuthModule, // imports firebase/firestore, only needed for database features
    AngularFirestoreModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgCalendarModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }) 
  ],

  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    WebView,
    Geolocation,
    NativeGeocoder,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: RouteReuseStrategy, useClass:
       IonicRouteStrategy },
       StudentService,
       LocalNotifications,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

