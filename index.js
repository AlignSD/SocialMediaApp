const { ApolloServer, PubSub } = require('apollo-server-express'); //
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
require('dotenv').config()

const MONGODB = process.env.MONGODB
const resolvers = require('./graphql/resolvers')
const typeDefs= require('./graphql/typeDefs')

const pubsub = new PubSub();

const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

await server.start();

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

server.applyMiddleware({ app, path: '/graphql'});
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    return app.listen({port: port});
  })
  .then(({ url }) => {
    console.log(`Server Running At ${url}`)
    return { server , app }

  })
  .catch(err => {
    console.error(err)
  })

  
