import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AddadminPage } from './../addadmin/addadmin';
import { AdmindetailsPage } from './../admindetails/admindetails';
import { ApiProvider } from './../../providers/api/api';
/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
	data : any[] = [];
	pushPage: any;
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public modalCtrl: ModalController,
				private toastCtrl: ToastController,
				private api: ApiProvider,
				public alertCtrl: AlertController,
				public loadingCtrl: LoadingController,
			) {
		this.pushPage = AdmindetailsPage;
	}

	pushModal() {
		const modal = this.modalCtrl.create(AddadminPage);
		modal.onDidDismiss( data1 =>
			this.navCtrl.setRoot(this.navCtrl.getActive().component),
		);
		modal.present();
	}

	details(value) {
		const modal = this.modalCtrl.create(AdmindetailsPage,value);
		modal.onDidDismiss( data1 =>
			this.navCtrl.setRoot(this.navCtrl.getActive().component),
		);
		modal.present();
	}

	loadData(){
		this.api.getAdminByMaster('m1').subscribe(
			element => {
				this.data.push(element);
			},
			err => console.log(err),
			()=> {
				this.data=this.data[0].item;
		
				for (var index = 0; index < this.data.length; index++) {
					this.data[index].l_id = this.getLockDetails(this.data[index].l_id);
				}
			},
		);
	}

	ionViewDidLoad() {
		this.loadData();
		console.log('ionViewDidLoad AdminPage');
	}

	getLockDetails(l_id){
		var lock = [];
		l_id.forEach(element => {
			this.api.getLockDetails(element).subscribe(
				element => lock.push(element.item[0].name),
				err => console.log(err),
			);
		});
		return lock;
	}

	
	doRefresh(event){ 
		setTimeout(() => {
			this.navCtrl.setRoot(this.navCtrl.getActive().component);
			event.complete();
		}, 1000);
	}

	deleteAlert(){
		let alert = this.alertCtrl.create({
			title: 'Delete Admin?',
			message: 'this will permanently delete the Admin and remove it from all locks\nYou will have to re-assign the locks to another Admin',
			buttons: [
			  {
				text: 'Disagree',
					handler: () => {
						alert.dismiss(false);
						return false;
					}
				}, {
					text: 'Agree',
					handler: () => {
						alert.dismiss(true);
						return false;
					}
				}
			]
		});
	
		return alert;
	}

	deleteAdmin(admin){
		let alert = this.deleteAlert();
		alert.present();
		alert.onDidDismiss((data) => {
			if(data){
				this.api.delAdmin(admin._id).subscribe(
					element => console.log(element),
					err => console.log(err),
				);
				this.presentToast('Admin Deleted Permanently');
				this.presentLoading();
				this.navCtrl.setRoot(this.navCtrl.getActive().component);
			}
		});
	}


	presentLoading() {
		const loader = this.loadingCtrl.create({
		  content: "Please wait...",
		  duration: 1000
		});
		loader.present();
	}
	presentToast(info) {
		let toast = this.toastCtrl.create({
		  message: info,
		  duration: 1000,
		  position: 'bottom'
		});	  
		toast.present();
	}
}
