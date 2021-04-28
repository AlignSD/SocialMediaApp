const { ApolloServer } = require('apollo-server'); //
const mongoose = require('mongoose');

const {MONGODB} = require('./config.js')
const resolvers = require('./graphql/resolvers')
const typeDefs= require('./graphql/typeDefs')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    return server.listen({ port:5000 })
  })
  .then((res) => {
    console.log(`Server Running At ${res.url}`)
  })

