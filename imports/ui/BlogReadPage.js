import React from 'react';
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { withTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/posts";

export const BlogReadPage = (props) => {
  return (
    <div>
      <h3>{props.post ? props.post.title : ''}</h3>
      <p>{props.post ? props.post.body : ''}</p>
    </div>
  )
}

export default withTracker((props) => {
  Meteor.subscribe('post', props.params.id)
  return {
    post: Posts.findOne(props.params.id)
  }
})(BlogReadPage)
