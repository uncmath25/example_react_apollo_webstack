const { gql } = require('apollo-server');


const typeDefs = gql`
  type Query {
    expenses(startDate: String!, endDate: String!): [Expense]!
  }

  type Expense {
    id: ID!
    category: ExpenseCategory!
    date: String!
    title: String!
    description: String!
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
