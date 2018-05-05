import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import PropTypes from "prop-types";

export class BlogPostHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }
  render() {
    return (
      <div>
        <input type="search" />
        <button onClick={() => {
          this.props.meteorCall('posts.insert', (err, res) => {
            if (res) {
              this.props.Session.set('selectedPostId', res)
            }
          })
        }}>Create post</button>
      </div>
    )
  }
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
