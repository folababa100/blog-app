import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import moment from 'moment';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types'

export const BlogListItem = (props) => {
  return (
    <div>
      <div className="card" onClick={() => {
        props.Session.set('selectedPostId', props.post._id)
      }}>
        <div className="card-body">
          <h5>{props.post.title}</h5>
          <p>{moment(props.post.createdAt).format('M/DD/YY')}</p>
        </div>
      </div>
    </div>
  )
}

BlogListItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default withTracker(() => {
  return {
    Session,
    browserHistory
  }
})(BlogListItem)
