import * as React from 'react';
import PricingIcon from '../../assets/images/visualelectric.png';
import ContactInformation from './contactInformation/index';
import TripInformation from '../TripInformation';
import './Dashboard.scss';
import ReviewAndSubmit from './reviewAndSubmit';

const Dashboard = () => {

  return (
      <div className="main-dashboard-container">
        <div className="clear-pricing">
          <div className="details-wrapper">
            <h1>Clear pricing in 1 day or less</h1>
            <p className="sub-heading">For simple trips, our price quote is <span>instant.</span></p>
          </div>
          <div className="pricing-img-wrapper">
            <img src={PricingIcon} alt="pricing" />
            <p className="header-card">Here every step to get you there comfortably & safely.</p>
          </div>
        </div>
        <ReviewAndSubmit />
        <TripInformation />
        <ContactInformation />
      </div>
  )
}

export default Dashboard;