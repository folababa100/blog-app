import React from 'react';
import PrivateHeader from './PrivateHeader';
import BlogList from './BlogList';
import BlogFilterInput from './BlogFilterInput';

export default Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Blog" />
      <div className="container__fluid">
        <div>
          <BlogFilterInput />
          <BlogList />
        </div>
      </div>
    </div>
  )
}
