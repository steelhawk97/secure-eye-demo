import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, LoadingController, ToastController, AlertController} from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
	selector: 'page-admindetails',
	templateUrl: 'admindetails.html',
})
export class AdmindetailsPage {
	@ViewChild(Slides) slides: Slides;
	public success:number = 0; 
	public editName: string;
	public limit: string;
	public details : any;
	public newLocks = [];
	public locks = [];
	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private viewCtrl: ViewController,
				public loadingCtrl: LoadingController,
				private toastCtrl: ToastController,
				private api: ApiProvider,
				public alertCtrl: AlertController,) {
	}

	ionViewDidLoad() {
		this.slides.lockSwipes(true);
    console.log('ionViewDidLoad AdmindetailsPage');
		this.getData();
	}
	getData() {
		this.details = this.navParams.data;
		this.editName = this.details.name;
		this.limit = this.details.limit;
		this.getLocks();
	}
	getLocks(){
		var all = []
		this.api.getLockByMaster('m1').subscribe(
			element => all.push(element.item),
			err => console.log(err),
			() => {
				all[0].forEach(element => {
					this.newLocks.push(element);
				});
			}
		);
	}
	updateLock(lock){
		var x = this.locks.indexOf(lock);
		if(x == -1){
			this.locks.push(lock);
			this.presentToast(lock.name + ' Selected');
		}
		else{
			this.locks.splice(x,1);
			this.presentToast(lock.name + ' Unselected');
		}
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
	closeModal(){
		this.viewCtrl.dismiss(true);
	}
	updateAlert(){
		let alert = this.alertCtrl.create({
			title: 'Update Admin details?',
			message: 'this will overwrite the previous information and will reset the admin for selected locks',
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

	onSubmit(){
		let alert = this.updateAlert();
		alert.present();
		alert.onDidDismiss((data) => {
			if(data){
				var res = [];
				var value = {
					// "name" : this.editName,
					"l_id" : [],
				};
				this.locks.forEach(element => {
					value.l_id.push(element.l_id);
				});
				console.log(value);
				this.api.editAdmin(this.details._id,value).subscribe(
					element =>{ 
						res.push(element);
						console.log(element);
					},
					err => console.log(err),
					() => {
						if(res[0].success)
							this.success = 1;
						else
							this.success = 2;
						this.changeSlide();
					}
				);
			}
		});
	}
	changeSlide(close:boolean=false) {
		this.slides.lockSwipes(false);
		this.slides.slideNext();
		this.slides.lockSwipes(true);
		if(!close)
			setTimeout(()=>{ this.closeModal() }, 2700)
		else 
			this.getLocks();
	}
}
