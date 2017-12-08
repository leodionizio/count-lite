import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
	selector: 'page-new-finance',
	templateUrl: 'new-finance.html'
})
export class NewFinancePage {
	constructor(
    public viewCtrl: ViewController    
  ) {}

  ionViewDidLoad() {	}
  
  public dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
