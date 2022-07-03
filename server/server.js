const express = require("express");
const { ApolloServer } = require("apollo-server");
require("dotenv").config();
// import "dotenv/config";
const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const port = process.env.PORT || 4000;
// const DB_HOST = process.env.DB_HOST;

const DB_HOST =
  "mongodb+srv://mern:mongodb@cytrynowysorbet.udove.mongodb.net/?retryWrites=true&w=majority";

let notes = [
  { id: "1", content: "note 1", author: "Ver" },
  { id: "2", content: "note 2", author: "Mike" },
  { id: "3", content: "note 3", author: "Elvis" },
];

db.connect(DB_HOST);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  },
  csrfPrevention: true,
  cache: "bounded",
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
