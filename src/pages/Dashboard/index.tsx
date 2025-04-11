import React from 'react';
import ContactInformationForm from '../../containers/ContactInformationForm';
import TripInformationForm from '../../containers/TripInformationForm';
import { DataProvider } from '../../context/dataContext';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <DataProvider>
      <div className="main-dashboard-container">
        <TripInformationForm />
        <ContactInformationForm />
      </div>
    </DataProvider>
  );
};

export default Dashboard;
