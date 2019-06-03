// const MINUTE = 60;

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    port: '3306',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'temp'
  }
});


class BudgetTrackerMySQL {
  constructor() {
    this.knex = knex;
  }

  getEmployeeById({ employeeId }) {
    return this.knex
      .select('*')
      .from('employees')
      .where({ id: employeeId })
      .first()
      .then(employee => this.employeeReducer(employee));
  }

  employeeReducer(employee) {
    return {
      id: employee.id,
      employee: employee.employee
    };
  }
}


module.exports = BudgetTrackerMySQL;
