import React from 'react';
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { withTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/posts";
import PropTypes from 'prop-types';

export const BlogReadPage = (props) => {
  return (
    <div className="container">
      <div className="container__fluid">
        <div className="container__read">
          <h1 className="h1">{props.post ? props.post.title : ''}</h1>
          <p>{props.post ? props.post.body : ''}</p>
          <p>{props.post ? `Page authored by ${props.post.username}` : ''}</p>
        </div>
      </div>
    </div>
  )
}

BlogReadPage.propTypes = {
  post: PropTypes.object.isRequired
}

export default withTracker((props) => {
  Meteor.subscribe('post', props.params.id)
  return {
    post: Posts.findOne(props.params.id)
  }
})(BlogReadPage)
