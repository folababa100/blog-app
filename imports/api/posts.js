import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from 'simpl-schema';
import moment from 'moment'

export const Posts = new Mongo.Collection("posts");

if (Meteor.isServer) {
  Meteor.publish('posts', function () {
    return Posts.find({ userId: this.userId });
  })
}

Meteor.methods({
  'posts.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not authorized')
    }

    return Posts.insert({
      title: '',
      body: '',
      userId: this.userId,
      createdAt: moment().valueOf()
    })
  }
})
