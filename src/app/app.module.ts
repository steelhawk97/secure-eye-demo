import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { HttpClientModule } from '@angular/common/http'; 

import { MyApp } from './app.component';
import { HomePage } from './../pages/home/home';
import { TabsPage } from './../pages/tabs/tabs';
import { AdminPage } from './../pages/admin/admin';
import { DevicePage } from './../pages/device/device';
import { LockPage } from './../pages/lock/lock';
import { EyePage } from './../pages/eye/eye';
import { PeoplePage } from './../pages/people/people';
import { AddlockPage } from './../pages/addlock/addlock';
import { AddeyePage } from './../pages/addeye/addeye';
import { AddadminPage } from './../pages/addadmin/addadmin';
import { EyedetailsPage } from './../pages/eyedetails/eyedetails';
import { LockdetailsPage } from './../pages/lockdetails/lockdetails';
import { AdmindetailsPage } from './../pages/admindetails/admindetails';
import { ApiProvider } from '../providers/api/api';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    DevicePage,
    AdminPage,
    LockPage,
    EyePage,
    PeoplePage,
    AddeyePage,
    AddlockPage,
    AddadminPage,
    EyedetailsPage,
    LockdetailsPage,
    AdmindetailsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    RoundProgressModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp,MyApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    DevicePage,
    AdminPage,
    LockPage,
    EyePage,
    PeoplePage,
    AddeyePage,
    AddlockPage,
    AddadminPage,
    EyedetailsPage,
    LockdetailsPage,
    AdmindetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
