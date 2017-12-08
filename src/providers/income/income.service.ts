import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { SqliteConnService } from '../sqlite-conn/sqlite-conn.service';
import { IncomeModel } from '../../models/income.model';

@Injectable()
export class IncomeService {

  private db: SQLiteObject;
  private isFirstCall: boolean = true;

  constructor(
    public sqliteConnService: SqliteConnService
  ) { }

  private getDb(): Promise<SQLiteObject> {
    if (this.isFirstCall) {
      this.isFirstCall = false;

      return this.sqliteConnService.getDb('count.db')
        .then((db: SQLiteObject) => {
          this.db = db;
          this.db.executeSql(`CREATE TABLE IF NOT EXISTS incomes
          (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            month INTEGER,
            description TEXT,
            value REAL
          )`, {})
            .then((success) => {
              console.log('Tabela renda criada com sucesso', success);
            })
            .catch((error) => {
              console.log('Erro ao criar tabela renda', error);
            })
          return this.db;
        })
    }
    return this.sqliteConnService.getDb();
  }

  public getAll(orderBy?: string): Promise<IncomeModel[]> {
    return this.getDb().then((db: SQLiteObject) => {
      return <Promise<IncomeModel[]>>this.db
        .executeSql(
        `
        SELECT id, month, description, value
        FROM incomes
        ORDER BY id ${orderBy || 'DESC'}`,
        {}
        )
        .then(resultSet => {
          let list: IncomeModel[] = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            list.push(resultSet.rows.item(i));
          }
          return list;
        })
        .catch((error: Error) => console.log('Erro', error));
    });
  }

  public create(income: IncomeModel): Promise<IncomeModel> {
    return this.getDb()
      .then((db: SQLiteObject) => {
        return this.db
          .executeSql(
          `
            INSERT INTO incomes (month, description, value)
            VALUES (?, ?, ?)`,
          [income.month, income.description, income.value]
          )
          .then(resultSet => {
            income.id = resultSet.insertId;
            return income;
          })
          .catch((error: Error) => {
            console.log(`Erro ao criar '${income.description}' renda!`, error);
            return income;
          });
      })
  }

  public update(income: IncomeModel): Promise<boolean> {
    return this.getDb()
      .then((db: SQLiteObject) => {
        return this.db
          .executeSql(
          `
            UPDATE incomes
            SET month = ?, description = ?, value = ?
            WHERE id= ?`,
          [income.month, income.description, income.value, income.id]
          )
          .then(resultSet => resultSet.rowsAffected >= 0)
          .catch((error: Error) => {
            console.log(`Erro ao atualizar renda!`, error);
            return false;
          });
      })
  }

  public delete(id: number): Promise<boolean> {
    return this.getDb()
      .then((db: SQLiteObject) => {
        return this.db
          .executeSql('DELETE FROM incomes WHERE id=?', [id])
          .then(resultSet => resultSet.rowsAffected >= 0)
          .catch((error: Error) => {
            console.log(`Erro ao deletar renda!`, error);
            return false;
          });
      })
  }

  public getById(id: number): Promise<IncomeModel> {
    return this.getDb()
      .then((db: SQLiteObject) => {
        return this.db
          .executeSql(
          `
            SELECT id, month, decription, value
            FROM incomes
            WHERE id=?`,
          [id]
          )
          .then(resultSet => {
            return resultSet.rows.item(0);
          })
          .catch((error: Error) => {
            console.log(`Erro ao encontrar renda!`, error);
          });
      })
  }


}