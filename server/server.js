const express = require("express");
const { ApolloServer, gql } = require("apollo-server");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const port = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    hello: String
    status: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!123",
    status: () => "Maintenance",
  },
};

let notes = [
  { id: "1", content: "note 1" },
  { id: "2", content: "note 2" },
  { id: "3", content: "note 3" },
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
