import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { browserHistory } from 'react-router';

export const BlogFIlterInput = (props) => {
  return (
    <div>
      <input type="search"/>
      <select>
        <option>By Title</option>
        <option>By Date</option>
      </select>
      <button onClick={() => props.dashboard()}>Add Post</button>
    </div>
  )
}

export default withTracker(() => {
  return {
    call: Meteor.call,
    dashboard: () => browserHistory.push('/create')
    
  }
})(BlogFIlterInput)
