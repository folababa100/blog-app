import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import Editor from './Editor';
import { Posts } from "../api/posts";

export const BlogEditor = (props) => {
  return (
    <div>
      <Editor />
    </div>
  )
}

export default withTracker(() => {
  const selectedPostId = Session.get('selectedPostId')
  Meteor.subscribe('posts')
  return {
    posts: Posts.find({}, {
      sort: {
        createdAt: -1
      }
    }).fetch().map((post) => {
      return {
        ...post,
        selected: post._id === selectedPostId
      }
    })
  }
})(BlogEditor)
