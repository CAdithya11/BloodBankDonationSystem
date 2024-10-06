import './Sidemenu.css';
import menu from '../Assets/menu.svg';
import dashboardImage from '../Assets/dashboard.svg';
import AppointmentImage from '../Assets/appointment.svg';
import donationsImage from '../Assets/donations.svg';
import logo from '../Assets/logo.svg';
import avatarIcon from '../Assets/avatar.jpg';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import altLogo from '../Assets/alterLogo.jpg';

function Sidemenu() {
  const ButtonActiveEffect = {
    border: '1px solid rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: 'inset -2px -2px 10px 0px rgba(255, 255, 255, 0.52)',
    borderRadius: '4px',
  };

  const isDashboard = useLocation().pathname === '/';
  const isDonations = useLocation().pathname === '/Donations';
  const isAppointment = useLocation().pathname === '/Appointment';

  const [burgerMenuClick, setBurgerMenu] = useState(false);
  const setBurgerMenuClick = () => {
    if (burgerMenuClick === true) {
      setBurgerMenu(false);
    } else {
      setBurgerMenu(true);
    }
  };

  return (
    <>
      <div className="AsideMenu" style={burgerMenuClick === false ? {} : { width: '100px' }}>
        <div className="AsideMenu-image" style={burgerMenuClick === false ? {} : { border: '0px 5px 5px 0px' }}></div>
        <div className="AsideMenu-menu" style={burgerMenuClick === false ? {} : { padding: '0px' }}>
          <div className="Atop">
            <div className="Alogo">
              {burgerMenuClick === false ? <img src={logo} alt="logo" /> : <img src={altLogo} alt="logo" />}
            </div>
            <div className="Amenu" style={burgerMenuClick === false ? {} : { justifyContent: 'center' }}>
              <img onClick={setBurgerMenuClick} src={menu} alt="menu" />
            </div>
            <Link to="/">
              <div style={isDashboard ? ButtonActiveEffect : {}} onChange={isDashboard === false} className="Abox">
                <img src={dashboardImage} alt="menu Icon" />
                {burgerMenuClick === false ? <p>Dashboard</p> : <p></p>}
              </div>
            </Link>
            <Link to="/Appointment">
              <div style={isAppointment ? ButtonActiveEffect : {}} className="Abox">
                <img src={AppointmentImage} alt="menu Icon" />
                {burgerMenuClick === false ? <p>Appointments</p> : <p></p>}
              </div>
            </Link>
            <div style={isDonations ? ButtonActiveEffect : {}} className="Abox">
              <img src={donationsImage} alt="menu Icon" />
              {burgerMenuClick === false ? <p>Donations</p> : <p></p>}
            </div>
          </div>
          <div className="bottom">
            <div className="profile">
              {burgerMenuClick === false ? (
                <div className="profile-info">
                  <p className="title">Luna Deo</p>
                  <p className="role">Donor</p>
                </div>
              ) : (
                <></>
              )}
              <img style={{ marginBottom: '35px' }} src={avatarIcon} alt="profileImage" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidemenu;
