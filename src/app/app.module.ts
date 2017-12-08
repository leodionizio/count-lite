import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ExpenseService } from '../providers/expense/expense.service';
import { IncomeService } from '../providers/income/income.service';
import { SqliteConnService } from '../providers/sqlite-conn/sqlite-conn.service';
import { NewFinancePage } from '../pages/new-finance/new-finance';


@NgModule({
  declarations: [
    MyApp,
    NewFinancePage        
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewFinancePage        
  ],
  providers: [
    ExpenseService,
    IncomeService,    
    StatusBar,
    SplashScreen,
    SqliteConnService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
