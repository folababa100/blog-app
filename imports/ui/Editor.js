import React from 'react';
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/posts";
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

export class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('posts.updates', this.props.post._id, { title })
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('posts.updates', this.props.post._id, { body })
  }
  handleRemoval() {
    this.props.call('posts.remove', this.props.post._id)
    this.props.browserHistory.push('/dashboard')
  }
  componentDidUpdate(prevProps, prevState) {
    const currentPostId = this.props.post ? this.props.post._id : undefined;
    const prevPostId = prevProps.post ? prevProps.post._id : undefined;

    if (currentPostId && currentPostId !== prevPostId) {
      this.setState({
        title: this.props.post.title,
        body: this.props.post.body
      });
    }
  }
  render() {
    if (this.props.post) {
      return (
        <div className="editor">
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange.bind(this)}
            placeholder="Untitled post"
          />
          <textarea
            value={this.state.body}
            onChange={this.handleBodyChange.bind(this)}
            placeholder="Your body here"
          >
          </textarea>
          <div>
            <button onClick={this.handleRemoval.bind(this)} className="button">Delete Note</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <p>
            {this.props.selectedPostId ? 'Note not found' : 'Please pick a note to get started'}
          </p>
        </div>
      )
    }
  }
}

Editor.propTypes = {
  post: PropTypes.object,
  selectedPostId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
}

export default withTracker(() => {
  const selectedPostId = Session.get('selectedPostId')

  return {
    selectedPostId,
    post: Posts.findOne(selectedPostId),
    call: Meteor.call,
    browserHistory
  }

})(Editor)
