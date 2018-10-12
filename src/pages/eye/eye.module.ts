import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EyePage } from './eye';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
	declarations: [
		EyePage,
	],
	imports: [
		IonicPageModule.forChild(EyePage),
		RoundProgressModule,
	],
})
export class EyePageModule {}
