'use strict';

require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const BudgetTrackerMySQL = require('./datasources/budget_tracker_mysql');


const PORT = process.env.SERVER_PORT;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    budgetTrackerMySQL: new BudgetTrackerMySQL()
  })
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
