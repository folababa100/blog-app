import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types'

export const BlogFIlterInput = (props) => {
  return (
    <div className="filter">
      <input placeholder="Search" className="form-control" type="search"/>
      <select className="form-control filter__select">
        <option>By Title</option>
        <option>By Date</option>
      </select>
      <button className="button button__blue button--secondary" onClick={() => props.dashboard()}>Add Post</button>
    </div>
  )
}

BlogFIlterInput.propTypes = {
  dashboard: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    call: Meteor.call,
    dashboard: () => browserHistory.push('/create')
    
  }
})(BlogFIlterInput)
