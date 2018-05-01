import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import moment from 'moment';

export const BlogListItem = (props) => {
  return (
    <div onClick={() => {
      props.Session.set('selectedPostId', props.post._id)
    }}>
      <div>
        <h5>{ props.post.title || 'Untitled post' }</h5>
        <p>{ moment(props.post.createdAt).format('M/DD/YY') }</p>
      </div>
    </div>
  )
}

export default withTracker(() => {
  return {
    Session
  }
})(BlogListItem)
