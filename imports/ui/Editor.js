import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/posts";
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router';
import PrivateHeader from './PrivateHeader';

export default class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.post ? props.post.title : '',
      body: props.post ? props.post.body : '',
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
      <div>
        <PrivateHeader title="Blog" />
        <div className="filter">
          <div className="row">
            <div className="editor__content">
              <Link className="blog--title a" to={`/read/${this.props.post ? this.props.post._id : ''}`}>{`A readable page available at http://localhost:3000/read/${this.props.post ? this.props.post._id : ''}`}</Link>
              <div>
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleTitleChange.bind(this)}
                  placeholder="Untitled post"
                  className="blog--title form-control"
                />
              </div>
              <div>
                <textarea
                  value={this.state.body}
                  onChange={this.handleBodyChange.bind(this)}
                  className="blog--body form-control"
                  rows="15"
                >
                </textarea>
              </div>
              <div className="editor__button">
                <button onClick={this.handleUpdates.bind(this)} className="button button--secondary button__blue">Save changes</button>
                <button onClick={() => this.setState({ open: true })} className="button button--secondary button__red x5">Delete Note</button>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Editor.propTypes = {
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}
