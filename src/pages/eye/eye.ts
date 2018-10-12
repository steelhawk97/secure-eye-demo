import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, FabContainer } from 'ionic-angular';
import { AddeyePage } from './../addeye/addeye';
import { EyedetailsPage } from './../eyedetails/eyedetails';
import { ApiProvider } from './../../providers/api/api';
@IonicPage()
@Component({
	selector: 'page-eye',
	templateUrl: 'eye.html',
})
export class EyePage {
	data : any[] = [];
	pushPage: any;
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public modalCtrl: ModalController,
				public api: ApiProvider,) {
		this.pushPage = EyedetailsPage;
	}

	pushModal(fab:FabContainer) {
		fab.close();
		const modal = this.modalCtrl.create(AddeyePage);
		modal.onDidDismiss( data1 =>
			this.navCtrl.setRoot(this.navCtrl.getActive().component),
		);
		modal.present();
	}
	
	shop(fab:FabContainer) {
		fab.close();
	}

	details(value) {
		const modal = this.modalCtrl.create(EyedetailsPage,value);
		modal.onDidDismiss( data1 =>
			this.navCtrl.setRoot(this.navCtrl.getActive().component),
		);
		modal.present();
	}

	loadData(){
		this.api.getEyeByMaster('m1').subscribe(
			element => this.data.push(element),
			err => console.log(err),
		);
	}

	ionViewDidLoad() {
		this.loadData();
		console.log('ionViewDidLoad EyePage');
	}

	doRefresh(event){ setTimeout(() => {
		this.navCtrl.setRoot(this.navCtrl.getActive().component);
		event.complete();
	  }, 1000);
	}
}
