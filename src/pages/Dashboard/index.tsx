import TripInformation from '../TripInformation';
import './Dashboard.scss';

const Dashboard = () => {
  const busTypes = ["Standard", "Luxury", "Mini", "Double Decker"];

  const handleSelection = (selectedValue: string) => {
    console.log("Selected Bus Type:", selectedValue);
  };
  return (
    <div className="main-dashboard-container">
      <TripInformation />
    </div>
  )
}

export default Dashboard;