import { Widgets } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import AppointmentServices from '../Service/AppointmentService';

import './main.css';

import ScheduleAppointment from './ScheduleAppointment';
import Sidemenu from './Sidemenu';
import TopBanner from './TopBanner';

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
        {window.innerWidth > 800 ? <Sidemenu /> : null}
        {
          <div className="Aappointments" style={window.innerWidth > 800 ? {} : { padding: '0px' }}>
            {<TopBanner />}

            <h1 style={Window.innerWidth > 800 ? {} : { fontSize: '30px' }}>Appointments</h1>
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
