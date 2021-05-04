const { ApolloServer, PubSub } = require('apollo-server'); //
const mongoose = require('mongoose');
require('dotenv').config()


const MONGODB = process.env.MONGODB
const resolvers = require('./graphql/resolvers')
const typeDefs= require('./graphql/typeDefs')

const pubsub = new PubSub();

// const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    return server.listen();
  })
  .then(({ url }) => {
    console.log(`Server Running At ${url}`)
  })
  .catch(err => {
    console.error(err)
  })

