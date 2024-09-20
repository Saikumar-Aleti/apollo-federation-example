const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const gql = require("graphql-tag");
const fs = require("fs");

const typeDefs = gql(fs.readFileSync("schema.graphql", "utf8"));

const productsData = [
  { id: "1", name: "Widget", price: 19.99 },
  { id: "2", name: "Gadget", price: 29.99 },
];

const resolvers = {
  Query: {
    products: () => productsData,
  },
  Product: {
    __resolveReference(product) {
      return productsData.find((p) => p.id === product.id);
    },
  },
};

async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
  });
  console.log(`Products service ready at ${url}`);
}

startServer();
