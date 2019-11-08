EXPENSES_TABLE = 'expenses'
EXPENSE_CATEGORIES_TABLE = 'expense_categories'

MIN_DATE = '1900-01-01'
MAX_DATE = '2100-01-01'

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
    this.EXPENSES_TABLE = EXPENSES_TABLE;
    this.EXPENSE_CATEGORIES_TABLE = EXPENSE_CATEGORIES_TABLE;
    this.MIN_DATE = MIN_DATE;
    this.MAX_DATE = MAX_DATE;
    this.EXPENSE_CATEGORY_MAP = EXPENSE_CATEGORY_MAP;
    this.INV_EXPENSE_CATEGORY_MAP = {};
    let mysqlCategories = Object.keys(this.EXPENSE_CATEGORY_MAP);
    for (var i=0; i < mysqlCategories.length; i++) {
      this.INV_EXPENSE_CATEGORY_MAP[this.EXPENSE_CATEGORY_MAP[mysqlCategories[i]]] = mysqlCategories[i];
    }
    this.ENUM_ID_MAP = null;
    this.knex = knex;
  }

  getExpenses({ startDate, endDate, categories }) {
    startDate = startDate || this.MIN_DATE;
    endDate = endDate || this.MAX_DATE;

    // Inner Join unnecessary because ensureIdMap can be used: here for information purposes
    let selectQueryPromise = this.knex
    .table(this.EXPENSES_TABLE)
    .innerJoin(
      this.EXPENSE_CATEGORIES_TABLE,
      this.EXPENSES_TABLE + '.category_id',
      this.EXPENSE_CATEGORIES_TABLE + '.id'
    )
    .select(
      this.EXPENSES_TABLE + '.id AS id',
      this.EXPENSE_CATEGORIES_TABLE + '.category_name AS category',
      this.EXPENSES_TABLE + '.date_time AS date',
      this.EXPENSES_TABLE + '.title AS title',
      this.EXPENSES_TABLE + '.description AS description',
      this.EXPENSES_TABLE + '.cost AS cost'
    )
    .whereBetween(this.EXPENSES_TABLE + '.date_time', [startDate, endDate]);

    if (categories) {
      selectQueryPromise = selectQueryPromise
        .whereIn(this.EXPENSE_CATEGORIES_TABLE + '.category_name',
          categories.map(category => this.INV_EXPENSE_CATEGORY_MAP[category])
        )
    }

    return selectQueryPromise.map(row => this.expenseReducer(row));
  }

  expenseReducer(expense) {
    return {
      id: expense.id,
      expense: {
        category: this.EXPENSE_CATEGORY_MAP[expense.category],
        date: expense.date,
        title: expense.title,
        description: expense.description,
        cost: expense.cost
      }
    };
  }

  addExpenses({ expenses }) {
    return this.ensureIdMap()
      .then(() =>
        this.knex.transaction(
          trx => knex(this.EXPENSES_TABLE)
            .transacting(trx)
            .insert(expenses.map(expense => ({
                id: null,
                category_id: this.ENUM_ID_MAP[expense.category],
                date_time: expense.date,
                title: expense.title,
                description: expense.description,
                cost: expense.cost
              }))
            )
        )
      ).then(() => expenses);
  }

  updateExpenses({ expenseIds }) {
    return this.ensureIdMap()
      .then(() => expenseIds.map(expenseId => (
        this.knex.transaction(
          trx => knex(this.EXPENSES_TABLE)
          .transacting(trx)
          .where({ id: expenseId.id })
          .update({
            category_id: this.ENUM_ID_MAP[expenseId.expense.category],
            date_time: expenseId.expense.date,
            title: expenseId.expense.title,
            description: expenseId.expense.description,
            cost: expenseId.expense.cost
          })
        )
      ))).then(() => expenseIds);
  }

  deleteExpenses({ ids }) {
    return new Promise((resolve, _) => {resolve()})
      .then(() => ids.map(eId => (
        this.knex.transaction(
          trx => knex(this.EXPENSES_TABLE)
          .transacting(trx)
          .where({ id: eId })
          .del()
        )
      ))).then(() => ids);
  }

  ensureIdMap() {
    return (
      this.ENUM_ID_MAP != null
      ? new Promise((resolve, _) => {resolve()})
      : this.knex
        .table(this.EXPENSE_CATEGORIES_TABLE)
        .select(
          this.EXPENSE_CATEGORIES_TABLE + '.id AS id',
          this.EXPENSE_CATEGORIES_TABLE + '.category_name AS name'
        )
        .then(idNamePairs => this.setIdMaps(idNamePairs))
    );
  }

  setIdMaps(idNamePairs) {
    this.ENUM_ID_MAP = {};
    for (var i=0; i < idNamePairs.length; i++) {
      this.ENUM_ID_MAP[this.EXPENSE_CATEGORY_MAP[idNamePairs[i].name]] = String(idNamePairs[i].id);
    }
  }
}


module.exports = BudgetTrackerMySQL;
