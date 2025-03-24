import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBanner from '../pages/TopBanner/index';

const Layout = () => {
  return (
    <>
     <TopBanner />
      <div className={`full-height container layout-sub-container`}>
        <Outlet />
      </div>
    </>
  )
}

export default Layout;