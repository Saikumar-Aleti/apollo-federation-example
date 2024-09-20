const { ApolloServer } = require("@apollo/server");
const { ApolloGateway } = require("@apollo/gateway");
const { startStandaloneServer } = require("@apollo/server/standalone");

async function startServer() {
  const gateway = new ApolloGateway({
    serviceList: [
      { name: "users", url: "http://localhost:4001/graphql" },
      { name: "products", url: "http://localhost:4002/graphql" },
    ],
    // Uncomment the following line to enable gateway introspection in development
    // debug: true,
  });

  const server = new ApolloServer({
    gateway,
    // Disable subscriptions (not currently supported with ApolloGateway)
    subscriptions: false,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Gateway ready at ${url}`);
}

startServer();
