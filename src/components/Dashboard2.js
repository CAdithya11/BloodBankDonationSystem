import './dashboard2.css';
import menu from '../Assets/menu.svg';
import dashboardImage from '../Assets/dashboard.svg';
import AppointmentImage from '../Assets/appointment.svg';
import donationsImage from '../Assets/donations.svg';
import logo from '../Assets/logo.svg';
import bellIcon from '../Assets/notification.svg';
import avatarIcon from '../Assets/avatar.jpg';
import statistic from '../Assets/statistic.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard2() {
  const [donors, setDonors] = useState([]);
  const [allDonors, setallDonors] = useState([]);
  const [sumDonations, setSumDonations] = useState('');
  /* 
  const [sumTodayDonations, setSumTodayDonations] = useState(''); */

  const fetchDonors = () => {
    axios.get('http://localhost:8091/Donor/getAll').then((responseO) => {
      const response = responseO.data.slice(0, 3);
      const sumDonations = responseO.data.reduce((sum, donor) => sum + parseFloat(donor.amount), 0);
      setallDonors(responseO.data);
      setDonors(response);
      setSumDonations(sumDonations);
      console.log('Fetched Succesfully');
    });
  };

  useEffect(() => {
    fetchDonors();
  }, []);
  return (
    <>
      <div className="D-main">
        <div className="AsideMenu">
          <div className="AsideMenu-image"></div>
          <div className="AsideMenu-menu">
            <div className="Atop">
              <div className="Alogo">
                <img src={logo} alt="logo" />
              </div>
              <div className="Amenu">
                <img src={menu} alt="menu" />
              </div>
              <Link to="/">
                <div className="Abox-one Abox">
                  <img src={dashboardImage} alt="menu Icon" />
                  <p>Dashboard</p>
                </div>
              </Link>
              <Link to="/Appointments">
                <div className="Abox-two Abox">
                  <img src={AppointmentImage} alt="menu Icon" />
                  <p>Appointments</p>
                </div>
              </Link>
              <div className="Abox-three Abox">
                <img src={donationsImage} alt="menu Icon" />
                <p>Donations</p>
              </div>
            </div>
            <div className="bottom">
              <div className="D-profile">
                <div className="D-profile-info">
                  <p className="D-title">Luna Deo</p>
                  <p className="D-role">Donor</p>
                </div>
                <img src={avatarIcon} alt="profileImage" />
              </div>
            </div>
          </div>
        </div>
        {
          <div className="Aappointments">
            {
              <>
                <div className="Alogin">
                  <div className="D-login-info">
                    <img id="bellIcon" src={bellIcon} alt="bellIcon" />
                    <div className="D-profile">
                      <div className="D-profile-info">
                        <p className="D-title">Luna Deo</p>
                        <p className="D-role">Donor</p>
                      </div>
                      <img src={avatarIcon} alt="profileImage" />
                    </div>
                  </div>
                </div>
                <div className="Awelcome">
                  <div className="AwelcomeImage"></div>
                  <div className="AwelcomeMessage">
                    <p className="AmessageHead">Welcome Donor!</p>
                    <p className="AmessageBody">"Be the reason for someone's heartbeat"</p>
                  </div>
                </div>
              </>
            }
            {
              <div className="D-counts-main">
                <div className="D-counts">
                  <div className="D-counts-box">
                    <img src={statistic} alt="static" />
                    <div className="D-box-info">
                      <p>Total Donors</p>
                      <p>{allDonors.length.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="D-counts-box">
                    <img src={statistic} alt="static" />
                    <div className="D-box-info">
                      <p>Total Donations</p>
                      <p>{sumDonations.toLocaleString()} mL</p>
                    </div>
                  </div>
                  <div className="D-counts-box">
                    <img src={statistic} alt="static" />
                    <div className="D-box-info">
                      <p>Today's Donations</p>
                      <p>10,456 mL</p>
                    </div>
                  </div>
                </div>
              </div>
            }

            <div className="D-leaderboard">
              <h1>Leaderboard</h1>
              <table>
                {donors.length > 0 ? (
                  donors.map((donor, index) => (
                    <tr>
                      <td className="D-index">{index + 1}</td>
                      <td>{donor.name}</td>
                      <td>{donor.district}</td>
                      <td>{donor.amount} mL</td>
                    </tr>
                  ))
                ) : (
                  <p>No donors available</p>
                )}
              </table>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Dashboard2;
