import * as React from 'react';
import TripInformationForm from '../TripInformationForm';
import ContactInformationForm from '../ContactInformationForm';
import TripPlanner from '../../components/TripPlanner/index';
import './Dashboard.scss';


const Dashboard = () => {

  return (
    <div className="main-dashboard-container">
      <TripInformationForm />
      <ContactInformationForm />
        <TripPlanner />
      </div>
  )
}

export default Dashboard;