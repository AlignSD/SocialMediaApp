const { ApolloServer } = require('apollo-server'); //
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const {MONGODB} = require('./config.js')
const Post = require('./models/Post')
// if you put a ! after the type it means the field is required
// typeDef is where you set the fields and their types for your database structure
const typeDefs = gql` 
  type Post{
    id: ID!
    body: String!
    createAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post],
  }
  `;
//graphql needs a resolver that returns the info from our query
// this may need to be named resolvers for apollo?
  const resolvers = {
    Query:{
      async getPosts(){
        try{
          const posts = await Post.find();
          return posts;
        } catch(err){
          throw new Error(err);
        }
      }
    }
  }

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    return server.listen({ port:5000 })
  })
  .then((res) => {
    console.log(`Server Running At ${res.url}`)
  })

