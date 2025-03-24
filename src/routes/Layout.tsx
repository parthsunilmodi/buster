import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBanner from '../pages/TopBanner/index';
import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <TopBanner />
      <div className={`full-height container layout-sub-container`}>
        <Outlet />
      </div>
    </>
  )
}

export default Layout;