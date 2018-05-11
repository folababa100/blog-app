import React from 'react';
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/posts";
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router';
import { Tracker } from "meteor/tracker";

export class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.post.title,
      body: this.props.post.body,
      open: false
    }
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
  }
  handleUpdates() {
    const { title } = this.state;
    const { body } = this.state;
    this.props.call('posts.updates', this.props.post._id, title, body);
    this.props.browserHistory.push('/dashboard')
  }
  handleRemoval() {
    this.props.call('posts.remove', this.props.post._id)
    this.props.browserHistory.push('/dashboard')
  }
  handleModalClose() {
    this.setState({ open: false })
  }
  render() {
    return (
      <div className="editor">
        {/* <Link to={`/read/${this.props.post._id}`}>A readable link</Link> */}
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
        <button onClick={this.handleUpdates.bind(this)}>Save changes</button>
        <button onClick={() => this.setState({ open: true })} className="button">Delete Note</button>
        <Modal
          isOpen={this.state.open}
          ariaHideApp={false}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <div>
            <p>Are you sure you want to delete this blog post</p>
            <button onClick={this.handleModalClose.bind(this)}>No</button>
            <button onClick={this.handleRemoval.bind(this)} className="button">Yes</button>
          </div>
        </Modal>
      </div>
    )
  }
}

Editor.propTypes = {
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
}

export default withTracker(() => {
  Meteor.subscribe('post', Session.get('selectedPostId'));
  return {
    post: Posts.findOne(Session.get('selectedPostId')),
    call: Meteor.call,
    browserHistory
  }

})(Editor)
