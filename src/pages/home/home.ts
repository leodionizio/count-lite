import { MonthModel } from './../../models/month.model';
import { ExpenseModel } from './../../models/expense.model';
import { IncomeService } from './../../providers/income/income.service';
import { ExpenseService } from './../../providers/expense/expense.service';
import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { NewFinancePage } from '../new-finance/new-finance';
import { IncomeModel } from '../../models/income.model';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public incomes: IncomeModel[] = [];
	public expenses: ExpenseModel[] = [];

	public months: [{
		value: number,
		label: string,
		expenses: ExpenseModel[],
		incomes: IncomeModel[],
		totalGasto: number,
		totalRenda: number,
	}] = [
			{ value: 1, label: 'Janeiro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 2, label: 'Fevereiro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 3, label: 'Março', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 4, label: 'Abril', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 5, label: 'Maio', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 6, label: 'Junho', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 7, label: 'Julho', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 8, label: 'Agosto', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 9, label: 'Setembro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 10, label: 'Outubro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 11, label: 'Novembro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 12, label: 'Dezembro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
		];

	constructor(
		public modalCtrl: ModalController,
		public navCtrl: NavController,
		public expService: ExpenseService,
		public incService: IncomeService
	) { }


	ionViewDidLoad(): void {
		this.refresh();
	}

	// ATUALIZA A LISTA DE CONTAS DO MÊS
	public refresh(): void {
		this.months = [
			{ value: 1, label: 'Janeiro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 2, label: 'Fevereiro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 3, label: 'Março', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 4, label: 'Abril', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 5, label: 'Maio', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 6, label: 'Junho', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 7, label: 'Julho', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 8, label: 'Agosto', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 9, label: 'Setembro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 10, label: 'Outubro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 11, label: 'Novembro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
			{ value: 12, label: 'Dezembro', expenses: [], incomes: [], totalGasto: 0, totalRenda: 0 },
		];
		// expenses service
		this.expService.getAll()
			.then(res => {
				res.forEach(el => {
					this.months.forEach(month => {
						if (month.value === el.month) {
							month.expenses.push(el);
							month.totalGasto = month.totalGasto + el.value;
						}
					})
				})
			})
			.catch(err => console.log(err))
		// incomes service
		this.incService.getAll()
			.then(res => {
				res.forEach(el => {
					this.months.forEach(month => {
						if (month.value === el.month) {
							month.incomes.push(el);
							month.totalRenda = month.totalRenda + el.value;
						}
					})
				})
			})
			.catch(err => console.log(err))

	}

	public deleteExp(exp): void {
		this.expService.delete(exp.id)
			.then(() => {
				console.log('Expense deletado com sucesso!')
				this.refresh()
			})
			.catch(err => {
				console.log('Erro ao deletar expense!')
			})
	}

	public deleteInc(inc): void {
		this.incService.delete(inc.id)
			.then(() => {
				console.log('Income deletado com sucesso!')
			})
			.catch(err => {
				console.log('Erro ao deletar income!')
			})
	}

	// EXIBIR O MODAL
	private presentModal(): void {
		let Modal = this.modalCtrl.create(NewFinancePage);
		Modal.present();
	}

	// CHAMA FUNÇÃO PARA EXIBIR MODAL
	public openModal(): void {
		this.presentModal();
	}
}
