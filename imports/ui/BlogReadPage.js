import React from 'react';
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { withTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/posts";

export const BlogReadPage = (props) => {
  return (
    <div>
      <h3>{props.post.title}</h3>
      <p>{props.post.body}</p>
    </div>
  )
}

export default withTracker(() => {
  const selectedPostIdE = Session.get('selectedPostIdE')
  Meteor.subscribe('posts', selectedPostIdE)
  return {
    post: Posts.findOne(selectedPostIdE)
  }
})(BlogReadPage)
