import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, AlertController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
	selector: 'page-addadmin',
	templateUrl: 'addadmin.html',
})
export class AddadminPage {
	@ViewChild(Slides) slides: Slides;
	value = {
		name:'',
		l_id:[],
		m_id:'m1',
	};
	public lock: boolean;
	public success:number = 0;  
	public locks = [];

	constructor
		(private camera: Camera,
		public navCtrl: NavController, 
		public navParams: NavParams,
		private viewCtrl: ViewController,
		private api: ApiProvider,
		public alertCtrl: AlertController,
	) {
	}

	pic(){
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		  }
		  
		  this.camera.getPicture(options).then((imageData) => {
		   // imageData is either a base64 encoded string or a file URI
		   // If it's base64 (DATA_URL):
		   let base64Image = 'data:image/jpeg;base64,' + imageData;
		  }, (err) => {
		   // Handle error
		  });
	}
	ionViewDidLoad() { 
		this.slides.lockSwipes(true);
		console.log('ionViewDidLoad AddadminPage');
		this.getLocks();
	}
	getLocks(){
		this.locks=[];
		var selected = [];
		this.api.getLockByMaster(this.value.m_id).subscribe(
			element => selected.push(element.item),
			err => console.log(err),
			() => {
				selected[0].forEach(element => {
					this.locks.push(element);
				});
			}
		);
	}
	updateLock(lock){
		var x = this.value.l_id.indexOf(lock);
		if(x == -1)
			this.value.l_id.push(lock);
		else
			this.value.l_id.splice(x,1);
	}	
	toggleLock(){
		this.getLocks();
		this.lock = !this.lock;
		this.value.l_id = [];
	}
	
	
	closeModal(){
		this.viewCtrl.dismiss(true);
	}

	onSubmit(){
		console.log(this.value);
		var res =[];
		this.api.postAdmin(this.value).subscribe(
			element => res.push(element),
			err => {
				console.log(err)
				this.changeSlides();
				this.success = 2;
			},
			() => {
				console.log(res);
				if(res[0].success){
					this.changeSlides();
					this.success = 1;
				} else {
					this.changeSlides();
					this.success = 2;
				}
			},
		)
	}

	changeSlides(){
		this.slides.lockSwipes(false);
		this.slides.slideNext();
		this.slides.lockSwipes(true);
		if(this.slides.getActiveIndex() == 1)
			setTimeout(()=>{ this.closeModal() }, 2700)
	}
}
