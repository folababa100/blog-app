// import React from 'react';
// import { withTracker } from "meteor/react-meteor-data";
// import Editor from './Editor';
// import { Posts } from "../api/posts";

// export const BlogEditor = (props) => {
//   return (
//     <div>
//       <Editor post={props.post} />
//     </div>
//   )
// }

// export default withTracker(() => {
//   const selectedPostId = Session.get('selectedPostId')
//   Meteor.subscribe('posts', selectedPostId)
//   return {
//     posts: Posts.find({}, {
//       sort: {
//         createdAt: -1
//       }
//     }).fetch().map((post) => {
//       return {
//         ...post
//       }
//     })
//   }
// })(BlogEditor)
