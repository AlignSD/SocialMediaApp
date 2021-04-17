const { gql } = require('apollo-server')

// if you put a ! after the type it means the field is required
// typeDef is where you set the fields and their types for your database structure
module.exports = gql` 
  type Post{
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post],
  }
  type Mutation{
    register(registerInput: RegisterInput): User! # This returs the User Type 
    login(username: String!, password: String!): User!
  }
  `;