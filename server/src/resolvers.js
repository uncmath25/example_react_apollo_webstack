module.exports = {
  Query: {
    expenses: (_, { startDate, endDate }, { dataSources }) => dataSources.budgetTrackerMySQL.getExpenses({ startDate, endDate })
  }
};
