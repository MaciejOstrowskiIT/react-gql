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

const JWT_SECRET = "Password";

const jwt = require("jsonwebtoken");

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Wrong session");
    }
  }
};

db.connect(DB_HOST);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    if (user) {
      console.log(user);
      return { models, user };
    } else {
      throw new Error("Header does not contain Authorization token");
    }
  },
  csrfPrevention: true,
  cache: "bounded",
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
