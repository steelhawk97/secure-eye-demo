import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmindetailsPage } from './admindetails';

@NgModule({
  declarations: [
    AdmindetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmindetailsPage),
  ],
})
export class AdmindetailsPageModule {}
