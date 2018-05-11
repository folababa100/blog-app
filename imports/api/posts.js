import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import { Session } from "meteor/session";

export const Posts = new Mongo.Collection("posts");

if (Meteor.isServer) {
  Meteor.publish('posts', function () {
    return Posts.find({ userId: this.userId });
  })
}

Meteor.methods({
  'posts.insert'(title, body) {
    if (!this.userId) {
      throw new Meteor.Error('not authorized')
    }

    new SimpleSchema ({
      title: {
        type: String,
        min: 1
      },
      body: {
        type: String,
        min: 1
      }
    })

    return Posts.insert({
      title,
      body,
      userId: this.userId,
      createdAt: moment().valueOf()
    })
  },
  'posts.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not authorized')
    }

    new SimpleSchema ({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id })

    Posts.remove({ _id, userId: this.userId })
  },
  'posts.updates'(_id, title, body) {
    if (!this.userId) {
      throw new Meteor.Error('not authorized')
    }

    new SimpleSchema ({
      _id: {
        type: String,
        min: 1
      },
      body: {
        type: String,
        optional: true
      },
      title: {
        type: String,
        optional: true
      }
    }).validate({ _id, title, body })

    Posts.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        title,
        body,
        createdAt: moment().valueOf()
      }
    })
  }
})
