import React from "react";
import BlogListItem from './BlogListItem';
import EmptyBlogContainer from './EmptyBlogContainer';
import BlogPostHeader from './BlogPostHeader'
import { Session } from "meteor/session";
import { Posts } from "../api/posts";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import PropTypes from 'prop-types'

export const BlogList = (props) => {
  return (
    <div>
      <BlogPostHeader/>
      {props.posts.length === 0 ? <EmptyBlogContainer/> : undefined}
      {props.posts.map((post) => {
        return <BlogListItem key={post._id} post={post} />
      })}
    </div>
  )
}

BlogList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default withTracker(() => {
  const selectedPostId = Session.get('selectedPostId')
  Meteor.subscribe('posts')
  return {
    posts: Posts.find({}, {
      sort: {
        createdAt: -1
      }
    }).fetch().map((post) => {
      return {
        ...post,
        selected: post._id === selectedPostId
      }
    })
  }
})(BlogList)
