import { useEffect, useState } from 'react';
import TripInformationForm from '../TripInformationForm';
import ContactInformationForm from '../ContactInformationForm';
import './Dashboard.scss';

const Dashboard = () => {
  const [submitData, setSubmitData] = useState(
    [{
      travelenddate_c: "5/22/2025",
      stops: [],
      submitted: new Date().toUTCString(),
      lead_source_description: "Static Quote v2",
    }]
  );

  return (
    <div className="main-dashboard-container">
      <TripInformationForm setSubmitData={setSubmitData} />
      <ContactInformationForm
        submitData={submitData}
        setSubmitData={setSubmitData}
      />
    </div>
  )
}

export default Dashboard;