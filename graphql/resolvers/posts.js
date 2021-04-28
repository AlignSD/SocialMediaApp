const Post = require('../../models/Post')
const checkAuth = require('../../util/checkAuth')
const { AuthenticationError } = require('apollo-server')

//graphql needs a resolver that returns the info from our query
// this may need to be named resolvers for apollo?
module.exports = {
  Query:{
    async getPosts(){
      try{
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch(err){
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try{
        const post = await Post.findById(postId);
        if(post){
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err){
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log(user,'user')
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()

      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try{
        const post = await Post.findById(postId);
        if(user.username === post.username){
          await post.delete();
          return "Post Deleted Sucessfully"
        } else{
          throw new AuthenticationError('Action not allowed');
        }
      }catch(err) {
        throw new Error(err);
      }
    }
  }
};