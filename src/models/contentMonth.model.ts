import { ExpenseModel } from "./expense.model";
import { IncomeModel } from "./income.model";

export class contentMonthModel {
        
        constructor(
           public value: number,
           public label: string,
           public expenses: ExpenseModel[],
           public incomes: IncomeModel[],
           public totalGasto: number,
           public totalRenda: number,
           public order: number
        ){}
    }