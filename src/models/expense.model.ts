export class ExpenseModel {

    public id: number;

    constructor(
        public month: number,
        public description: string,
        public value: number
    ){}
}