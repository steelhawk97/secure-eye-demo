import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-addlock',
  templateUrl: 'addlock.html',
})
export class AddlockPage {
	@ViewChild(Slides) slides: Slides;
	slide_no = 0;
	value = {
		m_id:'m1',
		e_id:[],
		name:'',
		l_id:'',
		battery:'14',
		status:false,
	};
	public eye: boolean;
	public success:number = 0;  
	public eyes = [];
	
  	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private viewCtrl: ViewController,
		private barcodeScanner: BarcodeScanner,
		private api: ApiProvider,
		public alertCtrl: AlertController,
	) {
		this.eye = false;
	}

	ionViewDidLoad() { 
		this.slides.lockSwipes(true);
		console.log('ionViewDidLoad AddlockPage');
		this.getData();
	}
	getData() {
		this.getEyes();
	}

	getEyes(){
		var selected = [];
		this.api.getEyeByMaster('m1').subscribe(
			element => selected.push(element.item),
			err => console.log(err),
			() => {
				selected[0].forEach(element => {
					this.eyes.push(element);
				});
				console.log(this.eyes);
			}
		);
	}

	updateEye(eye){
		console.log(eye);
		var x = this.value.e_id.indexOf(eye);
		if(x == -1){
			this.value.e_id = [];
			this.value.e_id.push(eye);
		}
		else
			this.value.e_id = [];
		console.log(this.value);
	}	
	toggleEye(){
		this.eye = !this.eye;
		this.value.e_id = [];
	}
	
	
	closeModal(){
		this.viewCtrl.dismiss(true);
	}

  	scanCode() {
		var scannedCode;
		this.barcodeScanner.scan().then(barcodeData => {
		scannedCode = barcodeData.text;
		}, (err) => {
			console.log('Error: ', err);
		});
		// scannedCode='l2';//remove this later
		var res =[];
		this.api.getLockWarehouseByLock(scannedCode).subscribe(
			element => res.push(element),
			err => console.log(err),
			() => {
				console.log(res);
				if(res[0].success){
					this.changeSlides();
					this.value.l_id = scannedCode;
				} else {
					this.changeSlides();
					this.success = 2;
					this.changeSlides();
				}
			}
		)
	}

	onSubmit(){
		var res =[];
		this.value.e_id = this.value.e_id[0];
		this.api.postLock(this.value).subscribe(
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
		this.slide_no = this.slide_no + 1;
		if(this.slides.getActiveIndex() == 2)
			setTimeout(()=>{ this.closeModal() }, 2700)
	}
}
