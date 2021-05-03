import React, { useContext } from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton';

function PostCard({post: {body, createdAt, id, username, likeCount, commentCount, likes}}) {

  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <LikeButton user={user} post={{ id, likes, likeCount}}/>
      <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
      <Button color='blue' basic>
        <Icon name='comments' />
      </Button>
      <Label  basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
    {user && user.username === username && (
      <Button as='div' color='red' floated='right' onClick={() => console.log('delete post')}> 
        <Icon name='trash' style={{ margin: '0px' }} />
      </Button>
    )}
      </Card.Content>
    </Card>
  )
}

export default PostCard
