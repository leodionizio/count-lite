import { SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { SqliteConnService } from '../sqlite-conn/sqlite-conn.service';
import { ExpenseModel } from '../../models/expense.model';

@Injectable()
export class ExpenseService {
	private db: SQLiteObject;
	private isFirstCall: boolean = true;

	constructor(public sqliteConnService: SqliteConnService) {}

	private getDb(): Promise<SQLiteObject> {
		if (this.isFirstCall) {
			this.isFirstCall = false;

			return this.sqliteConnService.getDb('finance.db').then((db: SQLiteObject) => {
				this.db = db;
				this.db
					.executeSql(
						`
          CREATE TABLE IF NOT EXISTS expenses 
          (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            month INTEGER
            description TEXT
            value REAL
          )`,
						{}
					)
					.then(success => {
						console.log('Tabela criada com sucesso', success);
					})
					.catch(error => {
						console.log('erro ao criar tabela', error);
					});
				return this.db;
			});
		}
		return this.sqliteConnService.getDb();
	}

	public getAll(orderBy?: string): Promise<ExpenseModel[]> {
		return this.getDb().then((db: SQLiteObject) => {
			return <Promise<ExpenseModel[]>>this.db
				.executeSql(
					`
          SELECT id, month, decription, value
          FROM expenses
          ORDER BY id ${orderBy || 'DESC'}`,
					{}
				)
				.then(resultSet => {
					let list: ExpenseModel[] = [];
					for (let i = 0; i < resultSet.rows.length; i++) {
						list.push(resultSet.rows.item(i));
					}
					return list;
				})
				.catch((error: Error) => console.log('Erro', error));
		});
	}

	public create(expense: ExpenseModel): Promise<ExpenseModel> {
		return this.db
			.executeSql(
				`
        INSERT INTO expense (month, description, value)
        VALUES (?, ?, ?)`,
				[expense.month, expense.description, expense.value]
			)
			.then(resultSet => {
				expense.id = resultSet.insertId;
				return expense;
			})
			.catch((error: Error) => {
				console.log(`Erro ao criar '${expense.description}' conta!`, error);
				return expense;
			});
	}

	public update(expense: ExpenseModel): Promise<boolean> {
		return this.db
			.executeSql(
				`
        UPDATE expense
        SET month = ?, description = ?, value = ?
        WHERE id= ?`,
				[expense.month, expense.description, expense.value, expense.id]
			)
			.then(resultSet => resultSet.rowsAffected >= 0)
			.catch((error: Error) => {
				console.log(`Erro ao atualizar conta!`, error);
				return false;
			});
	}

	public delete(id: number): Promise<boolean> {
		return this.db
			.executeSql('DELETE FROM expense WHERE id=?', [id])
			.then(resultSet => resultSet.rowsAffected >= 0)
			.catch((error: Error) => {
				console.log(`Erro ao deletar conta!`, error);
				return false;
			});
	}

	public getById(id: number): Promise<ExpenseModel> {
		return this.db
			.executeSql(
				`
        SELECT id, month, decription, value
        FROM expenses
        WHERE id=?`,
				[id]
			)
			.then(resultSet => {
				return resultSet.rows.item(0);
			})
			.catch((error: Error) => {
				console.log(`Erro ao encontrar conta!`, error);
			});
	}
}
