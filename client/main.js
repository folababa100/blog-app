import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
import LoadingPage from './../imports/ui/LoadingPage';


import Routes, { onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedPostId = Session.get('selectedPostId');

  if (selectedPostId) {
    browserHistory.push(`/edit/${selectedPostId}`);
  }
})

Tracker.autorun(() => {
  const selectedPostIdE = Session.get('selectedPostIdE');

  if (selectedPostIdE) {
    browserHistory.push(`/read/${selectedPostIdE}`)
  }
})

const jsx = (
  <Routes/>
)

let hasRender = false;

const RenderApp = () => {
  if(!hasRender) {
    ReactDOM.render(jsx, document.getElementById('app'));
  }
  hasRender = true;
}

Meteor.startup(() => {
  Session.set('selectedPostId', undefined);
  Session.set('selectedPostIdE', undefined)
  ReactDOM.render(<LoadingPage/>, document.getElementById('app'));
  RenderApp()
});
