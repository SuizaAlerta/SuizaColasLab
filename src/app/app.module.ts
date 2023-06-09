import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { ChartsModule } from 'ng2-charts'
import { NgApexchartsModule } from "ng-apexcharts";
import { OrderByPipe } from './order-by.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    OrderByPipe,
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    ReactiveFormsModule,
    ChartsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    NgApexchartsModule,
    AgmCoreModule.forRoot({
      /* apiKey: 'AIzaSyAAatGQSRkWM-3S5bWF0WX_qA7bLQ7ZmI8', */
      apiKey: 'AIzaSyCoC7beaO4Xwg_ReHQHCBajJHexvc1-BKQ',
      libraries: ['places']
    })
    
  ],
    
  providers: [AngularFirestore, DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }


