import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";

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
  onSubmit() {
    this.props.call('posts.insert', (err, res) => {
      if (res) {
        this.props.Session.set('selectedPostId', res)
      }
    })
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

export default withTracker(() => {
  const selectedPostId = Session.get('selectedPostId');
  return {
    selectedPostId,
    call: Meteor.call,
    Session
  }
})(BlogCreatePage)
