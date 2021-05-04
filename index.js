const { ApolloServer, PubSub } = require('apollo-server'); //
const mongoose = require('mongoose');

const {MONGODB} = require('./config/prod-config')
const resolvers = require('./graphql/resolvers')
const typeDefs= require('./graphql/typeDefs')

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    return server.listen(PORT)
  })
  .then((res) => {
    console.log(`Server Running At ${res.url}`)
  })
  .catch(err => {
    console.error(err)
  })

