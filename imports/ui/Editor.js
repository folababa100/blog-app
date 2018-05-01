import React from 'react';
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/posts";

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
    this.setState({ title })
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body })
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
    return (
      <div className="editor">
        <input type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} placeholder="Untitled post"/>
        <textarea value={this.state.body} onChange={this.handleBodyChange.bind(this)} placeholder="Your body here"></textarea>
      </div>
    )
  }
}

export default withTracker(() => {
  const selectedPostId = Session.get('selectedPostId')

  return {
    selectedPostId,
    post: Posts.findOne(selectedPostId),
    call: Meteor.call
  }

})(Editor)
