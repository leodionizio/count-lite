import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { NewFinancePage } from '../new-finance/new-finance';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	constructor(public modalCtrl: ModalController, public navCtrl: NavController) {}

	private presentModal(): void {
		let Modal = this.modalCtrl.create(NewFinancePage);
		Modal.present();
	}

	public openModal(): void {
		this.presentModal();
	}
}
