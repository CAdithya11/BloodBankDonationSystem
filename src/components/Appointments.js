import { useEffect, useState } from 'react';
import AppointmentServices from '../Service/AppointmentService';
import ScheduleAppointment from './scheduleAppointment';
import { Select } from 'antd';

function Appointments() {
  const [fetchedAppointments, setFetchedAppointments] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [time, setTime] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const available = [
    { label: '08:00:00 am', value: '08:00:00' },
    { label: '09:00:00 am', value: '09:00:00' },
    { label: '10:00:00 am', value: '10:00:00' },
    { label: '11:00:00 am', value: '11:00:00' },
    { label: '01:00:00 pm', value: '13:00:00' },
    { label: '02:00:00 pm', value: '14:00:00' },
    { label: '03:00:00 pm', value: '15:00:00' },
    { label: '04:00:00 pm', value: '16:00:00' },
    { label: '05:00:00 pm', value: '17:00:00' },
  ];

  const disabled = [{ time: '08:00:00' }, { time: '09:00:00' }];

  useEffect(() => {
    const disabledTimes = disabled.map((item) => item.time);
    const Time = available.filter((time) => !disabledTimes.includes(time.value));
    setAvailableTimes(Time);
  }, [setAvailableTimes, disabled, available]);

  const getValue = (time) => {
    setTime(time);
  };

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
      <div className="main">
        {<div className="sideMenu"></div>}
        <div className="appointments">
          {
            <>
              <div className="login"></div>
              <div className="welcome">
                <div className="welcomeImage"></div>
                <div className="welcomeMessage">
                  <img src="./Assets/titlebar.jpg" alt="" />
                  <p className="messageHead">Welcome Donor!</p>
                  <p className="messageBody">"Be the reason for someone's heartbeat"</p>
                </div>
              </div>
            </>
          }

          <h1>Appointments</h1>
          <div className="schedule">
            {buttonClicked === false ? (
              <>
                <button onClick={setButtonClicked} className="saButton">
                  SCHEDULE APPOINTMENTS
                </button>
                {fetchedAppointments.length > 0 ? (
                  <>
                    <div className="table">
                      <table>
                        <tr className="head">
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
                            <td className="dlButton">
                              <button>DELETE</button>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="noAppoinments">
                      <p>Appoinments Does not exists </p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="saContainer">
                <ScheduleAppointment />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointments;
