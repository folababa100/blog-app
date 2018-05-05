import React from 'react';
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/posts";
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

export class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      open: false
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
  handleModalClose() {
    this.setState({ open: false })
  }
  render() {
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
