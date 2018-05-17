import React from 'react';
import { Accounts } from "meteor/accounts-base";
import { Link } from 'react-router';
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from 'prop-types';

export const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <Link to="/dashboard"><h1 className="header__title">{props.title}</h1></Link>
        
        <button onClick={() => props.handleAccountLogout()} className="button button__logout">Logout</button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  handleAccountLogout: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
} 

export default withTracker(() => {
  return {
    handleAccountLogout: () => Accounts.logout()
  }
})(PrivateHeader)
