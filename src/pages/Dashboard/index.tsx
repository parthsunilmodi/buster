import * as React from 'react';
import TripInformationForm from '../TripInformationForm';
import ContactInformationForm from '../ContactInformationForm';
import './Dashboard.scss';

const Dashboard = () => {

  return (
    <div className="main-dashboard-container">
      <TripInformationForm />
      <ContactInformationForm />
    </div>
  )
}

export default Dashboard;