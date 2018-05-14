import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Dashboard from '../ui/Dashboard'
import Editor from '../ui/Editor';
import BlogReadPage from '../ui/BlogReadPage';
import BlogCreatePage from '../ui/BlogCreatePage';

const onEnterPostPage = (nextState) => {
  Session.set('selectedPostId', nextState.params.id);
};

const onLeavePostPage = () => {
  Session.set('selectedPostId', undefined);
};

const onEnterPostPagee = (nextState) => {
  Session.set('selectedPostIdE', nextState.params.id);
};

const onLeavePostPagee = () => {
  Session.set('selectedPostIdE', undefined);
};

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};
export default Routes = () => (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth"/>
      <Route path="/signup" component={Signup} privacy="unauth"/>
      <Route path="/create" component={BlogCreatePage} privacy="auth"/>
      <Route path="/edit/:id" component={Editor} privacy="auth" onEnter={onEnterPostPage} onLeave={onLeavePostPage}/>
      <Route path="/read/:id" component={BlogReadPage} privacy="unauth" onEnter={onEnterPostPagee} onLeave={onLeavePostPagee}/>
      <Route path="/dashboard" component={Dashboard} privacy="auth"/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
