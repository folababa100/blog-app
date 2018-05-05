import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import moment from 'moment';
import { browserHistory } from 'react-router';

export const BlogListItem = (props) => {
  const className = props.post.selected ? 'item' : 'item-selected';
  return (
    <div className={className} onClick={() => {
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
    Session,
    browserHistory
  }
})(BlogListItem)
