import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LockPage } from './../lock/lock';
import { EyePage } from './../eye/eye';
/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {

  page1: any;
  page2: any;
  page3: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.page1 = LockPage;
    this.page2 = EyePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }
    onTabSelect(ev: any) {
      console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
    }
}
