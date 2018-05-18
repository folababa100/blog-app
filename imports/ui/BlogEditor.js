import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import Editor from './Editor';
import { Posts } from "../api/posts";
import { browserHistory } from 'react-router';
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";

export const BlogEditor = (props) => {
  return (
    <div>
      <Editor
        post={props.post} 
        call={props.call} 
        browserHistory={props.browserHistory}
      />
    </div>
  )
}

export default withTracker((props) => {
  Tracker.autorun(() => {
    Meteor.subscribe('post', props.params.id);
  })
  return {
    post: Posts.findOne(props.params.id),
    call: Meteor.call,
    browserHistory
  }

})(BlogEditor)