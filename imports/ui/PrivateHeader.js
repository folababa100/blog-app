import React from 'react';
import { Accounts } from "meteor/accounts-base";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from 'prop-types';

export const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button onClick={() => props.handleAccountLogout()} className="button button--link-text">Logout</button>
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
