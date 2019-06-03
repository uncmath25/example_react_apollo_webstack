module.exports = {
  Query: {
    employee: (_, { id }, { dataSources }) =>
      dataSources.budgetTrackerMySQL.getEmployeeById({ employeeId: id })
  }
};
