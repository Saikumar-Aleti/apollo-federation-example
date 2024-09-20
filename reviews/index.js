const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const gql = require("graphql-tag");
const fs = require("fs");

const typeDefs = gql(fs.readFileSync("schema.graphql", "utf8"));

// Define resolvers
const resolvers = {
  Query: {
    reviews: () => [
      { id: "101", content: "Great product!", author: { id: "1" } },
    ],
  },
  User: {
    reviews(user) {
      return [
        { id: "101", content: "Great product!", author: { id: user.id } },
      ];
    },
  },
};

async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4004 },
  });
  console.log(`Reviews service ready at ${url}`);
}

startServer();
