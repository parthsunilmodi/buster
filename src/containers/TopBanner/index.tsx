import * as React from 'react';
import PricingIcon from '../../assets/images/visualelectric.png';
import './TopBanner.scss';

const TopBanner = () => {

  return (
    <div className="top-banner container">
      <div className="clear-pricing">
        <div className="details-wrapper">
          <span className="_clear">Clear pricing in 1 day or less</span>
          <p className="sub-heading">For simple trips, our price quote is <span>instant.</span></p>
        </div>
        <div className="pricing-img-wrapper">
          <img src={PricingIcon} alt="pricing" />
          <p className="header-card">Here every step to get you there comfortably & safely.</p>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;