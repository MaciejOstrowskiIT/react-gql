const express = require("express");
const { ApolloServer, gql } = require("apollo-server");
require("dotenv").config();
// import "dotenv/config";
const db = require("./db");
const models = require("./models");

const port = process.env.PORT || 4000;
// const DB_HOST = process.env.DB_HOST;

const DB_HOST =
  "mongodb+srv://mern:mongodb@cytrynowysorbet.udove.mongodb.net/?retryWrites=true&w=majority";

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
    createdAt: String
    updatedAt: String
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!123",
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    },
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: "XYZ",
      });
    },
  },
};

let notes = [
  { id: "1", content: "note 1", author: "Ver" },
  { id: "2", content: "note 2", author: "Mike" },
  { id: "3", content: "note 3", author: "Elvis" },
];

db.connect(DB_HOST);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
