const Query = require("./query");
const Mutation = require("./mutation");
const { GraphQLDateTime } = require("graphql-iso-date");

module.exports = {
  Mutation,
  Query,
  DateTime: GraphQLDateTime,
};
