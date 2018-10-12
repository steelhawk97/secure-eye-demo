import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminPage } from './../admin/admin';

/**
 * Generated class for the PeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  page1: any;
  page2: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.page1 = AdminPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }
    onTabSelect(ev: any) {
      console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
    }
}
