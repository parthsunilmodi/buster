import React from 'react';
import TripInformation from '../TripInformation';
import ContactInformation from './contactInformation/index';
import './Dashboard.scss';

const Dashboard = () => {

  return (
    <>
      <div className="main-dashboard-container">
        <TripInformation />
        <ContactInformation />
      </div>
    </>
  )
}

export default Dashboard;