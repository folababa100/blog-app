import React from "react";
import BlogListItem from './BlogListItem';
import EmptyBlogContainer from './EmptyBlogContainer';
import BlogPostHeader from './BlogPostHeader'
import { Session } from "meteor/session";
import { Posts } from "../api/posts";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

export const BlogList = (props) => {
  return (
    <div className="container">
      <div className="container__fluid">
        <FlipMove maintainContainerHeight={true}>
          <div className="container__content">
            {props.posts.length === 0 ? <EmptyBlogContainer /> : undefined}
          </div>
          {props.posts.map((post) => {
            return <BlogListItem key={post._id} post={post} />
          })}
        </FlipMove>
      </div>
    </div>
  )
}

BlogList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default withTracker(() => {
  Meteor.subscribe('posts')
  return {
    posts: Posts.find({}, {
      sort: {
        createdAt: -1
      }
    }).fetch().map((post) => {
      return {
        ...post
      }
    })
  }
})(BlogList)
