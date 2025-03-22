import CustomDropdown from '../../components/CustomDropdown';
import FileSelector from '../../components/FileSelector';
import './Dashboard.scss';

const Dashboard = () => {
  const busTypes = ["Standard", "Luxury", "Mini", "Double Decker"];

  const handleSelection = (selectedValue: string) => {
    console.log("Selected Bus Type:", selectedValue);
  };
  return (
    <>
    <div className="main-dashboard-container">Dashboard</div>
    <FileSelector/>
    <CustomDropdown label="Preferred bus type:" options={busTypes} onSelect={handleSelection} />
    </>
  )
}

export default Dashboard;