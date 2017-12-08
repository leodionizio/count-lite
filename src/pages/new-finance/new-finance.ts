import { ExpenseService } from './../../providers/expense/expense.service';
import { IncomeService } from './../../providers/income/income.service';
import { ExpenseModel } from './../../models/expense.model';
import { IncomeModel } from './../../models/income.model';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-new-finance',
  templateUrl: 'new-finance.html'
})
export class NewFinancePage {

  public months: [{
    value: number, label: string
  }] = [
      { value: 1, label: 'Janeiro' },
      { value: 2, label: 'Fevereiro' },
      { value: 3, label: 'Março' },
      { value: 4, label: 'Abril' },
      { value: 5, label: 'Maio' },
      { value: 6, label: 'Junho' },
      { value: 7, label: 'Julho' },
      { value: 8, label: 'Agosto' },
      { value: 9, label: 'Setembro' },
      { value: 10, label: 'Outubro' },
      { value: 11, label: 'Novembro' },
      { value: 12, label: 'Dezembro' },
    ]

  private model;

  private form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public viewCtrl: ViewController,
    public incService: IncomeService,
    public expService: ExpenseService
  ) {

    this.form = this.fb.group({
      type: '2',
      month: 1,
      description: '',
      value: null
    })

  }

  ionViewDidLoad() { }

  public saveData(): void {
    console.log('form', this.form.value);
    if (this.form.valid) {


      if (this.form.value.type === '1') {
        this.model = new IncomeModel(
          this.form.value.month,
          this.form.value.description,
          this.form.value.value,
        )

        this.incService.create(this.model)
          .then(res => {
            this.dismiss();
          })
          .catch(err => {
            console.log(err);
          })

      } else if (this.form.value.type === '2') {

        this.model = new ExpenseModel(
          this.form.value.month,
          this.form.value.description,
          this.form.value.value,
        )

        this.expService.create(this.model)
          .then(res => {
            this.dismiss();
          })
          .catch(err => {
            console.log(err);
          })
      }
    }

  }

  public dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
