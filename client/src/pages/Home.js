import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import {Grid, Image} from 'semantic-ui-react'

import PostCard from '../components/PostCard.js';

const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
    <Grid.Row>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : (
        posts && posts.map(post => (
          <Grid.Column key={post.id} style={{marginBottom: '1rem'}}>
            <PostCard post={post} />
          </Grid.Column>
        ))
      )}
    </Grid.Row>
  </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
    id body createdAt username likeCount
    likes{
      username
    }
      commentCount
      comments{
        id username createdAt body
      }
    }
  }
`;

export default Home
