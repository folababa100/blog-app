import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import PropTypes from "prop-types";

export const BlogPostHeader = (props) => {
  return (
    <div>
      <button onClick={() => {
          props.meteorCall('posts.insert', (err, res) => {
            if (res) {
              props.Session.set('selectedPostId', res)
            }
          })
        }}>Create post</button>
    </div>
  )
}

BlogPostHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
}

export default withTracker(() => {
  return {
    meteorCall: Meteor.call,
    Session
  }
})(BlogPostHeader)
