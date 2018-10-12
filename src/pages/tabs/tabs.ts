import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from './../home/home';
import { DevicePage } from './../device/device';
import { PeoplePage } from './../people/people';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 : any;
  tab2 : any;
  tab3 : any;
  tab4 : any;
  tab5 : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.tab2 = DevicePage;
    this.tab3 = HomePage;
    this.tab4 = PeoplePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}
