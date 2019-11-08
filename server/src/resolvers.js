module.exports = {
  Query: {
    getExpenses: (_, { startDate, endDate, categories }, { dataSources }) => dataSources.budgetTrackerMySQL.getExpenses({ startDate, endDate, categories })
  },
  Mutation: {
    addExpenses: (_, { expenses }, { dataSources }) => dataSources.budgetTrackerMySQL.addExpenses({ expenses }),
    updateExpenses: (_, { expenseIds }, { dataSources }) => dataSources.budgetTrackerMySQL.updateExpenses({ expenseIds }),
    deleteExpenses: (_, { ids }, { dataSources }) => dataSources.budgetTrackerMySQL.deleteExpenses({ ids })
  }
};
