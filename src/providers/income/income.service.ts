import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { SqliteConnService } from '../sqlite-conn/sqlite-conn.service';

@Injectable()
export class IncomeService {

  private db: SQLiteObject;
  private isFirstCall: boolean = true;

  constructor(
    public sqliteConnService: SqliteConnService
  ) {}

  private getDb(): Promise<SQLiteObject> {
  if (this.isFirstCall) {
    this.isFirstCall = false;

    return this.sqliteConnService.getDb('count.db')
      .then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql(`CREATE TABLE IF NOT EXISTS income
          (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            value REAL,
            month INTEGER,
            description TEXT,
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


}