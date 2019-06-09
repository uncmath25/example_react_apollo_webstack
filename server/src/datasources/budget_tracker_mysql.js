const EXPENSE_CATEGORY_MAP = {
  'Grocery': 'GROCERY',
  'Living Essentials': 'LIVING_ESSENTIALS',
  'Dining': 'DINING',
  'Shopping & Entertainment': 'SHOPPING_AND_ENTERTAINMENT',
  'Special': 'SPECIAL'
}

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    port: '3306',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'budget_tracker',
    dateStrings: true
  }
});


class BudgetTrackerMySQL {
  constructor() {
    this.knex = knex;
    this.EXPENSE_CATEGORY_MAP = EXPENSE_CATEGORY_MAP;
  }

  getExpenses( { startDate, endDate } ) {
    return this.knex
      .table('expenses')
      .innerJoin('expense_categories', 'expenses.category_id', 'expense_categories.id')
      .select(
        'expenses.id AS id',
        'expense_categories.category_name AS category',
        'expenses.date_time AS date',
        'expenses.title AS title',
        'expenses.description AS description',
        'expenses.cost AS cost'
      )
      .whereBetween('expenses.date_time', [startDate, endDate])
      .map(row => this.expenseReducer(row));
  }

  expenseReducer(expense) {
    console.log(expense);
    return {
      id: expense.id,
      category: this.EXPENSE_CATEGORY_MAP[expense.category],
      date: expense.date,
      title: expense.title,
      description: expense.description,
      cost: expense.cost
    };
  }
}


module.exports = BudgetTrackerMySQL;
