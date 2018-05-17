import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types'

export const BlogFIlterInput = (props) => {
  return (
    <div className="filter">
      <div className="filter__content">
        <input placeholder="Search" className="form-control" type="search" autoComplete="off" spellCheck="false" />
        <select className="form-control filter__select">
          <option>By Title</option>
          <option>By Date</option>
        </select>
      </div>
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
