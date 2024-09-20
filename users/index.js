const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const gql = require("graphql-tag");
const fs = require("fs");

const typeDefs = gql(fs.readFileSync("schema.graphql", "utf8"));

const usersData = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
];

const resolvers = {
  Query: {
    users: () => usersData,
  },
  User: {
    __resolveReference(user) {
      return usersData.find((u) => u.id === user.id);
    },
  },
};

async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`Users service ready at ${url}`);
}

startServer();
