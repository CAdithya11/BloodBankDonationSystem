import { useEffect, useState } from 'react';
import AppointmentServices from '../Service/AppointmentService';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.svg';
import './main.css';
import menu from '../Assets/menu.svg';
import dashboardImage from '../Assets/dashboard.svg';
import AppointmentImage from '../Assets/appointment.svg';
import donationsImage from '../Assets/donations.svg';
import bellIcon from '../Assets/notification.svg';
import avatarIcon from '../Assets/avatar.jpg';
import ScheduleAppointment from './ScheduleAppointment';

function Appointments() {
  const [fetchedAppointments, setFetchedAppointments] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const appointment = true;

  const fetchAppointments = async () => {
    try {
      const response = await AppointmentServices.findAppoinments();
      setFetchedAppointments(response.data);
      console.log('Succesfully Fetched');
    } catch (error) {
      console.error('Error Fetching Appointments', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  return (
    <>
      <div className="Amain">
        {
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
                  <div className="Abox-two Abox">
                    <img src={dashboardImage} alt="menu Icon" />
                    <p>Dashboard</p>
                  </div>
                </Link>
                <div className="Abox-one Abox">
                  <img src={AppointmentImage} alt="menu Icon" />
                  <p>Appointments</p>
                </div>
                <div className="Abox-three Abox">
                  <img src={donationsImage} alt="menu Icon" />
                  <p>Donations</p>
                </div>
              </div>
              <div className="bottom"></div>
            </div>
          </div>
        }
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

            <h1>Appointments</h1>
            <div className="Aschedule">
              {buttonClicked === false ? (
                <>
                  <button onClick={setButtonClicked} className="AsaButton">
                    SCHEDULE APPOINTMENTS
                  </button>
                  {fetchedAppointments.length > 0 ? (
                    <>
                      <div className="Atable">
                        <table>
                          <tr className="Ahead">
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                          {fetchedAppointments.map((appoinment) => (
                            <tr key={appoinment.id}>
                              <td>{appoinment.date}</td>
                              <td>{appoinment.time}</td>
                              <td>{appoinment.location}</td>
                              <td>{appoinment.status}</td>
                              <td className="AdlButton">
                                <button>DELETE</button>
                              </td>
                            </tr>
                          ))}
                        </table>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="AnoAppoinments">
                        <p>Appoinments Does not exists </p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="AsaContainer">
                  <ScheduleAppointment />
                </div>
              )}
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Appointments;
