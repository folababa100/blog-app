import React from 'react';
import PrivateHeader from './PrivateHeader';
import BlogList from './BlogList';

export default Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Blog"/>
      <BlogList/>
    </div>
  )
}
