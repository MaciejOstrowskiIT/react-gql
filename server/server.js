const express = require("express");
const { ApolloServer, gql } = require("apollo-server");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const port = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!123",
    notes: () => notes,
    note: (args) => {
      return notes.find((note) => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: "Luege",
      };
      notes.push(noteValue);
      return noteValue;
    },
  },
};

let notes = [
  { id: "1", content: "note 1", author: "Ver" },
  { id: "2", content: "note 2", author: "Mike" },
  { id: "3", content: "note 3", author: "Elvis" },
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
