const { gql } = require('apollo-server');


const typeDefs = gql`
  type Query {
    getExpenses(startDate: String, endDate: String, categories: [String]): [ExpenseId]!
  }

  type Mutation {
    addExpenses(expenses: [ExpenseInput]!): [Expense]!
    updateExpenses(expenseIds: [ExpenseIdInput]!): [ExpenseId]!
    deleteExpenses(ids: [ID]!): [ID]!
  }

  type ExpenseId {
    id: ID!
    expense: Expense!
  }

  type Expense {
    category: ExpenseCategory!
    date: String!
    title: String!
    description: String
    cost: Float!
  }

  input ExpenseIdInput {
    id: ID!
    expense: ExpenseInput!
  }

  input ExpenseInput {
    category: ExpenseCategory!
    date: String!
    title: String!
    description: String
    cost: Float!
  }

  enum ExpenseCategory {
    GROCERY
    LIVING_ESSENTIALS
    DINING
    SHOPPING_AND_ENTERTAINMENT
    SPECIAL
  }
`;


module.exports = typeDefs;
