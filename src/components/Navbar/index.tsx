import logo from '../../assets/busbank-logo.webp';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="main-navbar-container">
      <div>
        <img src={logo} alt="navbar-logo" />
      </div>
    </div>
  )
}

export default Navbar;