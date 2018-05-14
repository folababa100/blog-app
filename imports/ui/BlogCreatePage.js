import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { browserHistory } from 'react-router';

export class BlogCreatePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title })
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body })
  }
  onSubmit(e) {
    e.preventDefault()
    const { title } = this.state;
    const { body } = this.state;
    this.props.call('posts.insert', title, body, (err, res) => {
      if (!err) {
        this.setState({ title: '', body: '' })
      }
    })
    this.props.browserHistory.push('/dashboard')
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" onChange={this.handleTitleChange.bind(this)} />
          <textarea onChange={this.handleBodyChange.bind(this)}></textarea>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

BlogCreatePage.propTypes = {
  browserHistory: PropTypes.object.isRequired,
  call: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    call: Meteor.call,
    browserHistory
  }
})(BlogCreatePage)
