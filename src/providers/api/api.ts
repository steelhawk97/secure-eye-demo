import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Basic } from './model';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiProvider {
	private url: string = "http://192.168.43.78:3000/";
	private imgurl: string = "http://192.168.43.78:3001/";
	constructor(public http: HttpClient, private transfer: FileTransfer) {
		console.log('Hello ApiProvider Provider');
	}

	uploadImage(img, desc) {
		
		   // Destination URL
		   let url = this.imgurl + 'images';
		
		   // File for Upload
		   var targetPath = img;
		
		   var options: FileUploadOptions = {
			 fileKey: 'image',
			 chunkedMode: false,
			 mimeType: 'multipart/form-data',
			 params: { 'desc': desc }
		   };
		
		   const fileTransfer: FileTransferObject = this.transfer.create();
		
		   // Use the FileTransfer to upload the image
		   return fileTransfer.upload(targetPath, url, options);
		 }
		

	//master
	public postMaster(value): Observable<Basic> {
		return  this.http.post(this.url + 'master/',value).map(response  => {return  new  Basic(response);});
	}
	public delMaster(link): Observable<Basic> {
		return  this.http.delete(this.url + 'master/'+link).map(response  => {return  new  Basic(response);});
	}
	public editMaster(link,value): Observable<Basic> {
		return  this.http.put(this.url + 'master/' + link, value).map(response  => {return  new  Basic(response);});
	}
	public getMaster(): Observable<Basic> {
		return  this.http.get(this.url + 'master/').map(response  => {return  new  Basic(response);});
	}

	//admin
	public postAdmin(value): Observable<Basic> {
		return  this.http.post(this.url + 'admin/',value).map(response  => {return  new  Basic(response);});
	}
	public delAdmin(link): Observable<Basic> {
		return  this.http.delete(this.url + 'admin/'+link).map(response  => {return  new  Basic(response);});
	}
	public editAdmin(link,value): Observable<Basic> {
		return  this.http.put(this.url + 'admin/' + link, value).map(response  => {return  new  Basic(response);});
	}
	public getAdmin(): Observable<Basic> {
		return  this.http.get(this.url + 'admin').map(response  => {return  new  Basic(response);});
	}
	public getAdminByMaster(link): Observable<Basic> {
		return  this.http.get(this.url + 'admin/'+link).map(response  => {return  new  Basic(response);});
	}
	public getAdminDetails(admin): Observable<Basic> {
		return  this.http.get(this.url + 'adminDetails/' + admin).map(response  => {return  new  Basic(response);});
	}
	public getAdminByEye(eye): Observable<Basic> {
		return  this.http.get(this.url + 'adminEye/' + eye).map(response  => {return  new  Basic(response);});
	}
	public getAdminByNotEye(master,eye): Observable<Basic> {
		return  this.http.get(this.url + 'adminEye/'+ master + '/' + eye).map(response  => {return  new  Basic(response);});
	}
	public getAdminByLock(lock): Observable<Basic> {
		return  this.http.get(this.url + 'adminLock/' + lock).map(response  => {return  new  Basic(response);});
	}
	public getAdminByNotLock(master,lock): Observable<Basic> {
		return  this.http.get(this.url + 'adminLock/'+ master + '/' + lock).map(response  => {return  new  Basic(response);});
	}
	public editAdminPassword(link,value): Observable<Basic> {
		return  this.http.put(this.url + 'adminPassword/' + link, value).map(response  => {return  new  Basic(response);});
	}

	//eye
	public postEye(value): Observable<Basic> {
		return  this.http.post(this.url + 'eye/',value).map(response  => {return  new  Basic(response);});
	}
	public delEye(link): Observable<Basic> {
		return  this.http.delete(this.url + 'eye/'+link).map(response  => {return  new  Basic(response);});
	}
	public editEye(link,value): Observable<Basic> {
		return  this.http.put(this.url + 'eye/' + link, value).map(response  => {return  new  Basic(response);});
	}
	public getEye(): Observable<Basic> {
		return  this.http.get(this.url + 'eye/').map(response  => {return  new  Basic(response);});
	}
	public getEyeDetails(eye): Observable<Basic> {
		return  this.http.get(this.url + 'eyeDetails/' + eye).map(response  => {return  new  Basic(response);});
	}
	public getEyeByMaster(master): Observable<Basic> {
		return this.http.get(this.url + 'eye/'+master).map(response  => {return new Basic(response);});
	}
	public getEyeByMasterNotEye(master,eye): Observable<Basic> {
		return this.http.get(this.url + 'eyeEye/'+ master + '/' + eye).map(response  => {return new Basic(response);});
	}
	public getEyeByAdmin(admin): Observable<Basic> {
		return  this.http.get(this.url + 'eyeAdmin/' + admin).map(response  => {return  new  Basic(response);});
	}
	
	//lock
	public postLock(value): Observable<Basic> {
		return  this.http.post(this.url + 'lock/',value).map(response  => {return  new  Basic(response);});
	}
	public delLock(link): Observable<Basic> {
		return  this.http.delete(this.url + 'lock/'+link).map(response  => {return  new  Basic(response);});
	}
	public editLockByMaster(lock,value): Observable<Basic> {
		return  this.http.put(this.url + 'lockMaster/' + lock, value).map(response  => {return  new  Basic(response);});
	}
	public editLockByAdmin(lock,value): Observable<Basic> {
		return  this.http.put(this.url + 'lockAdmin/' + lock, value).map(response  => {return  new  Basic(response);});
	}
	public getLock(): Observable<Basic> {
		return  this.http.get(this.url + 'lock/').map(response  => {return  new  Basic(response);});
	}
	public getLockDetails(lock): Observable<Basic> {
		return  this.http.get(this.url + 'lockDetails/' + lock).map(response  => {return  new  Basic(response);});
	}
	public getLockByMaster(master): Observable<Basic> {
		return  this.http.get(this.url + 'lock/'+master).map(response  => {return  new  Basic(response);});
	}
	public getLockByMasterNotAdmin(master,admin): Observable<Basic> {
		return  this.http.get(this.url + 'lockNotAdmin/'+ master + '/' + admin).map(response  => {return  new  Basic(response);});
	}
	public getLockByAdmin(admin): Observable<Basic> {
		return  this.http.get(this.url + 'lockAdmin/' + admin).map(response  => {return  new  Basic(response);});
	}
	public getLockByEye(eye): Observable<Basic> {
		return  this.http.get(this.url + 'lockEye/' + eye).map(response  => {return  new  Basic(response);});
	}
	public getLockByNotEye(master,eye): Observable<Basic> {
		return  this.http.get(this.url + 'lockNotEye/'+ master + '/' + eye).map(response  => {return  new  Basic(response);});
	}
	public getLockByLevel(level): Observable<Basic> {
		return  this.http.get(this.url + 'lockLevel/' + level).map(response  => {return  new  Basic(response);});
	}
	public getLockByNotLevel( level, body): Observable<Basic> {//fix this
		return  this.http.get(this.url + 'lockNotLevel/' + level, body).map(response  => {return  new  Basic(response);});
	}
	public getLockByEyeNotAdmin( eye, admin): Observable<Basic> {
		return  this.http.get(this.url + 'lockEyeNotAdmin/' + eye + '/' + admin).map(response  => {return  new  Basic(response);});
	}
	public getUnlocked(): Observable<Basic> {
		return  this.http.get(this.url + 'unlocked/').map(response  => {return  new  Basic(response);});
	}

	//level
	public postLevel(value): Observable<Basic> {
		return  this.http.post(this.url + 'level/',value).map(response  => {return  new  Basic(response);});
	}
	public delLevel(link): Observable<Basic> {
		return  this.http.delete(this.url + 'level/'+link).map(response  => {return  new  Basic(response);});
	}
	public editLevel(link,value): Observable<Basic> {
		return  this.http.put(this.url + 'level/' + link, value).map(response  => {return  new  Basic(response);});
	}
	public getLevel(): Observable<Basic> {
		return  this.http.get(this.url + 'level/').map(response  => {return  new  Basic(response);});
	}
	public getLevelByAdmin(admin): Observable<Basic> {
		return  this.http.get(this.url + 'level/'+admin).map(response  => {return  new  Basic(response);});
	}
	public getLevelByLock(lock): Observable<Basic> {
		return  this.http.get(this.url + 'levelByLock/' + lock).map(response  => {return  new  Basic(response);});
	}
	public getLevelByNotLock(admin,lock): Observable<Basic> {
		return  this.http.get(this.url + 'levelByNotLock/'+ admin + '/' + lock).map(response  => {return  new  Basic(response);});
	}
	
	//user
	public postUser(value): Observable<Basic> {
		return  this.http.post(this.url + 'user/',value).map(response  => {return  new  Basic(response);});
	}
	public delUser(link): Observable<Basic> {
		return  this.http.delete(this.url + 'user/'+link).map(response  => {return  new  Basic(response);});
	}
	public editUser(link,value): Observable<Basic> {
		return  this.http.put(this.url + 'user/' + link, value).map(response  => {return  new  Basic(response);});
	}
	public getUserByAdmin(admin): Observable<Basic> {
		return  this.http.get(this.url + 'user/'+admin).map(response  => {return  new  Basic(response);});
	}
	public getUserByLock(admin,lock): Observable<Basic> {
		return  this.http.get(this.url + 'userSelected/' + admin + '/' + lock).map(response  => {return  new  Basic(response);});
	}
	public getUserByNotLock(admin,lock): Observable<Basic> {
		return  this.http.get(this.url + 'userNotSelected/'+ admin + '/' + lock).map(response  => {return  new  Basic(response);});
	}
	public getUserByLevel(level): Observable<Basic> {
		return  this.http.get(this.url + 'userLevel/' + level).map(response  => {return  new  Basic(response);});
	}
	public getUserByNotLevel(admin,level): Observable<Basic> {
		return  this.http.get(this.url + 'userLevel/'+ admin + '/' + level).map(response  => {return  new  Basic(response);});
	}

	//battery
	public eyeLowByMaster(master): Observable<Basic> {
		return  this.http.get(this.url + 'eyeLow/'+master).map(response  => {return  new  Basic(response);});
	}
	public eyeCritByMaster(master): Observable<Basic> {
		return  this.http.get(this.url + 'eyeCrit/'+master).map(response  => {return  new  Basic(response);});
	}
	public lockLowByMaster(master): Observable<Basic> {
		return  this.http.get(this.url + 'lockLow/'+master).map(response  => {return  new  Basic(response);});
	}
	public lockCritByMaster(master): Observable<Basic> {
		return  this.http.get(this.url + 'lockCrit/'+master).map(response  => {return  new  Basic(response);});
	}

	//activity
	public getActivityByEye(eye): Observable<Basic> {
		return  this.http.get(this.url + 'lockCrit/'+eye).map(response  => {return  new  Basic(response);});
	}
	public getActivityByAdmin(eye,admin): Observable<Basic> {
		return  this.http.get(this.url + 'lockCrit/'+ eye + '/' + admin).map(response  => {return  new  Basic(response);});
	}
	
	public getEyeWarehouseByEye(eye): Observable<Basic> {
		return  this.http.get(this.url + 'eyeWarehouse/'+eye).map(response  => {return  new  Basic(response);});
	}
	public getLockWarehouseByLock(lock): Observable<Basic> {
		return  this.http.get(this.url + 'lockWarehouse/'+ lock).map(response  => {return  new  Basic(response);});
	}
	
	//error
	errorHandler(error: HttpErrorResponse){
		return Observable.throw(error.message || "Server Error");
	}	

}
