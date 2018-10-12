import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-addeye',
  templateUrl: 'addeye.html',
})
export class AddeyePage {
	@ViewChild(Slides) slides: Slides;
	slide_no = 0;
	value = {
		m_id:'m1',
		e_id:'',
		name:'',
		l_id:[],
		battery:'90',
	};
	public admin: boolean;
	public lock: boolean;
	public success:number = 0;  
	public locks = [];
	public admins = [];
	
  	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private viewCtrl: ViewController,
		private barcodeScanner: BarcodeScanner,
		private api: ApiProvider,
		public alertCtrl: AlertController,
	) {
		this.admin = false;
	}

	ionViewDidLoad() { 
		this.slides.lockSwipes(true);
		console.log('ionViewDidLoad AddeyePage');
		this.getData();
	}
	getData() {
		this.getLocks();
	}

	
	getLocks(){
		var selected = [];
		this.api.getLockByMaster('m1').subscribe(
			element => selected.push(element.item),
			err => console.log(err),
			() => {
				selected[0].forEach(element => {
					this.locks.push(element);
				});
				console.log(this.locks);
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
		this.lock = !this.lock;
		this.value.l_id = [];
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
		// scannedCode='e3';//remove this later
		var res =[];
		this.api.getEyeWarehouseByEye(scannedCode).subscribe(
			element => res.push(element),
			err => console.log(err),
			() => {
				console.log(res);
				if(res[0].success){
					this.changeSlides();
					this.value.e_id = scannedCode;
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
		this.api.postEye(this.value).subscribe(
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
