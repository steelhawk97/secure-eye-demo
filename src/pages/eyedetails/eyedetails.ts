import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, LoadingController, ToastController, AlertController} from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
	selector: 'page-eyedetails',
	templateUrl: 'eyedetails.html',
})
export class EyedetailsPage {
	@ViewChild(Slides) slides: Slides;
	public success:number = 0;  
	public edit:boolean = false;
	public editName: "";
	public details : any;
	public newLocks = [];
	public locks = [];
	public text : string;
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
		console.log('ionViewDidLoad EyedetailsPage');
		this.getData();
	}
	getData() {
		this.details = this.navParams.data;
		this.editName = this.details.name;
		this.getLocks();
	}
	getLocks(){
		var selected = [];
		this.api.getLockByEye(this.details.e_id).subscribe(
			element => {console.log(element);selected.push(element.item)},
			err => console.log(err),
			() => {
				selected[0].forEach(element => {
					this.locks.push(element);
				});
				console.log("lock",this.locks);
			}
		);
		var all = [];
		this.api.getLockByNotEye('m1',this.details.e_id).subscribe(
			element => all.push(element.item),
			err => console.log(err),
			() => {
				all[0].forEach(element => {
					this.newLocks.push(element);
				});
				console.log(this.newLocks);
			}
		);
	}
	updateLock(lock){
		var x = this.locks.indexOf(lock);
		console.log(x);
		if(x == -1){
			this.locks.push(lock);
			this.newLocks.splice(this.newLocks.indexOf(lock),1);
			this.presentToast(lock.name + ' Selected');
		}
		else{
			this.locks.splice(x,1);
			this.newLocks.push(lock);
			this.presentToast(lock.name + ' Unselected');
		}
	}

	editDetails() {
		this.presentLoading();
		this.edit = !this.edit
		if(!this.edit){
			this.locks = [];
			this.newLocks = [];
			this.getData();
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
			title: 'Update Eye details?',
			message: 'this will overwrite the previous information and will change the eye for selected admins',
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
	deleteAlert(){
		let alert = this.alertCtrl.create({
			title: 'Delete Eye?',
			message: 'this will permanently delete the eye and remove it from all admins and locks\nYou will have to re-assign the locks and admins to this eye',
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
		this.text='updated';
		let alert = this.updateAlert();
		alert.present();
		alert.onDidDismiss((data) => {
			if(data){
				var res = [];
				var value = {
					"name" : this.editName,
					"a_id" : [],
					"l_id" : [],
				};
				this.locks.forEach(element => {
					value.l_id.push(element.l_id);
				});
				this.api.editEye(this.details.e_id,value).subscribe(
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
	onDelete(){
		this.text='deleted';
		let alert = this.deleteAlert();
		alert.present();
		alert.onDidDismiss((data) => {
			if(data){
				var res = [];
				this.api.delEye(this.details.e_id).subscribe(
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
	changeSlide() {
		this.slides.lockSwipes(false);
		this.slides.slideNext();
		this.slides.lockSwipes(true);
		setTimeout(()=>{ this.closeModal() }, 2700)
	}
}
