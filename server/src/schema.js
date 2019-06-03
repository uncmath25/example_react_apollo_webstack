const { gql } = require('apollo-server');


const typeDefs = gql`
  type Query {
    # employees: [Employee]!
    employee(id: Int!): Employee
  }

  type Employee {
    id: Int!
    employee: String
  }
`;


module.exports = typeDefs;
