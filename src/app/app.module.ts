import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import firebaseConfig from './firebase'



import { HttpModule } from '@angular/http'
import { UserService } from './user.service';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireAuthModule, // imports firebase/firestore, only needed for database features
    AngularFirestoreModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    HttpModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass:
       IonicRouteStrategy },
       UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

