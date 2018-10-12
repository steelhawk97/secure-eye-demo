import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, FabContainer } from 'ionic-angular';
import { AddlockPage } from './../addlock/addlock';
import { LockdetailsPage } from './../lockdetails/lockdetails';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
	selector: 'page-lock',
	templateUrl: 'lock.html',
})
export class LockPage {
	data : any[] = [];
	pushPage: any;
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public modalCtrl: ModalController,
				public api: ApiProvider,) {
		this.pushPage = LockdetailsPage;
	}

	pushModal(fab:FabContainer) {
		fab.close();
		const modal = this.modalCtrl.create(AddlockPage);
		modal.onDidDismiss( data1 =>
			this.navCtrl.setRoot(this.navCtrl.getActive().component),
		);
		modal.present();
	}
	
	shop(fab:FabContainer) { //complete this
		fab.close();
	}

	details(value) {
		const modal = this.modalCtrl.create(LockdetailsPage,value);
		modal.onDidDismiss( data1 =>
			this.navCtrl.setRoot(this.navCtrl.getActive().component),
		);
		modal.present();
	}

	loadData(){
		this.api.getLockByMaster('m1').subscribe(
			element => this.data.push(element),
			err => console.log(err),
		);
	}

	ionViewDidLoad() {
		this.loadData();
		console.log('ionViewDidLoad LockPage');
	}

	doRefresh(event){ setTimeout(() => {
		this.navCtrl.setRoot(this.navCtrl.getActive().component);
		event.complete();
	  }, 1000);
	}
}
