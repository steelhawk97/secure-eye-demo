import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
	selector: 'page-lockdetails',
	templateUrl: 'lockdetails.html',
})
export class LockdetailsPage {
	@ViewChild(Slides) slides: Slides;
	public success:number = 0;  
	public edit:boolean = false;
	public editName: "";
	public details : any;

	public newAdmins = [];
	public admins = [];

	public eye = [];
	public newEyes= [];

	public text : string;

	public role = 'master';
	
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
		console.log('ionViewDidLoad LockdetailsPage');
		this.getData();
	}
	getData() {
		this.details = this.navParams.data;
		this.editName = this.details.name;
		this.masterData();
	}
	masterData(){
		this.getEye();
		this.getAdmins();
	}
	getEye(){
		var selected = [];
		this.api.getEyeDetails(this.details.e_id).subscribe(
			element => selected.push(element.item),
			err => console.log(err),
			() => {
				if (selected[0].length > 0) {
					selected[0].forEach(element => {
						this.eye.push(element);
					});
				}
			}
		);
		var all = [];
		this.api.getEyeByMasterNotEye('m1',this.details.e_id).subscribe(
			element => all.push(element.item),
			err => console.log(err),
			() => {
				all[0].forEach(element => {
					this.newEyes.push(element);
				});
			}
		);
	}
	getAdmins(){
		var selected = [];
		this.api.getAdminByLock(this.details.l_id).subscribe(
			element => selected.push(element.item),
			err => console.log(err),
			() => {
				selected[0].forEach(element => {
					this.admins.push(element);
				});
			}
		);
		var all = [];
		this.api.getAdminByNotLock('m1',this.details.l_id).subscribe(
			element => all.push(element.item),
			err => console.log(err),
			() => {
				all[0].forEach(element => {
					this.newAdmins.push(element);
				});
			}
		);
	}
	updateEye(eye){
		var x = this.eye.indexOf(eye);
		if(x == -1){
			if(this.eye.length>0)
				this.newEyes.push(this.eye[0]);
			this.newEyes.splice(this.newEyes.indexOf(eye),1);
			this.eye = [];
			this.eye.push(eye);
			this.presentToast(eye.name + ' Selected');
		}
		else{
			this.eye = [];
			this.newEyes.push(eye);
			this.presentToast(eye.name + ' Unselected');
		}
	}
	updateAdmin(admin){
		var x = this.admins.indexOf(admin);
		if(x == -1){
			this.admins.push(admin);
			this.newAdmins.splice(this.newAdmins.indexOf(admin),1);
			this.presentToast(admin.name + ' Selected');
		}
		else{
			this.admins.splice(x,1);
			this.newAdmins.push(admin);
			this.presentToast(admin.name + ' Unselected');
		}
	}
	editDetails() {
		this.presentLoading();
		this.edit = !this.edit
		if(!this.edit){
			this.newAdmins = [];
			this.admins = [];
			this.newEyes = [];
			this.eye = [];
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

	viewAlert(value){
		let alert = this.alertCtrl.create({
			title: value.title,
			message: value.message,
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

	onMasterSubmit(){
		this.text='updated';
		var message = {
			title: "Update Lock details?",
			message: "This will overwrite all previous settings for this lock"
		}
		let alert = this.viewAlert(message);
		alert.present();
		alert.onDidDismiss((data) => {
			if(data){
				var res = [];
				var value = {
					"name" : this.editName,
					"a_id" : [],
					"e_id" : (this.eye.length>0)?this.eye[0].e_id:null,
				};
				this.admins.forEach(element => {
					value.a_id.push(element._id);
				});
				this.api.editLockByMaster(this.details.l_id,value).subscribe(
					element => res.push(element),
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
		var message = {
			title:'Delete Eye?',
			message:'this will permanently delete the Lock and remove it from all admins and eyes\nYou will have to re-assign the eyes and admins to this Lock'
		}
		let alert = this.viewAlert(message);
		alert.present();
		alert.onDidDismiss((data) => {
			if(data){
				var res = [];
				this.api.delLock(this.details.l_id).subscribe(
					element => res.push(element),
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
