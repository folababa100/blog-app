import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { browserHistory } from 'react-router';
import PrivateHeader  from './PrivateHeader';

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
        <PrivateHeader title="Blog" />
        <div className="editor">
          <div className="editor__content">
            <div>
              <input
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange.bind(this)}
                placeholder="Untitled post"
                className="blog--title"
              />
            </div>
            <div>
              <textarea
                value={this.state.body}
                onChange={this.handleBodyChange.bind(this)}
                className="blog--body"
                cols="100"
                rows="23"
              >
              </textarea>
            </div>
            <div className="editor__button">
              <button onClick={this.onSubmit.bind(this)} className="button button--secondary button__blue">Save</button>
            </div>
          </div>
        </div>
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
