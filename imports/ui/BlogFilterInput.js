import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types'

export const BlogFIlterInput = (props) => {
  return (
    <div className="filter">
      <div className="container">
        <div className="filter--content">
          <input placeholder="Search" className="form-control" type="search" autoComplete="off" spellCheck="false" />
        </div>
        <div className="filter--input">
          <select className="form-control">
            <option>By Title</option>
            <option>By Date</option>
          </select>
        </div>
        <div className="filter--button">
          <button className="button button__blue button--secondary percent" onClick={() => props.dashboard()}>Add Post</button>
        </div>
      </div>
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
