import { useState } from 'react';
import TripInformationForm from '../TripInformationForm';
import ContactInformationForm from '../ContactInformationForm';
import './Dashboard.scss';

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [submitData, setSubmitData] = useState(
    [{
      stops: [],
      submitted: new Date().toUTCString(),
      lead_source_description: "Static Quote v2",
    }]
  );

  return (
    <div className="main-dashboard-container">
      <TripInformationForm
        selectedCard={selectedCard}
        setSubmitData={setSubmitData}
        setSelectedCard={setSelectedCard}
      />
      <ContactInformationForm
        selectedCard={selectedCard}
        submitData={submitData}
        setSubmitData={setSubmitData}
      />
    </div>
  )
}

export default Dashboard;