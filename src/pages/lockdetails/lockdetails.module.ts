import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LockdetailsPage } from './lockdetails';

@NgModule({
  declarations: [
    LockdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LockdetailsPage),
  ],
})
export class LockdetailsPageModule {}
