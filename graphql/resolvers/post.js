const Post = require('../../models/Post')

//graphql needs a resolver that returns the info from our query
// this may need to be named resolvers for apollo?
module.exports = {
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