import flatpickr from 'flatpickr';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentServices from '../Service/AppointmentService';

function ScheduleAppointment() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();
  const status = 'Approved';

  const [fetchedLocations, setFetchedLocations] = useState([]);
  const [fetchedDates, setFetchedDates] = useState([]);
  const [fetchedTimes, setFetchedTimes] = useState([]);

  /*################################################### */
  /*################# Fetch Location ################## */
  /*################################################### */
  /* Fetch Locations */
  const fetchLocation = async () => {
    try {
      const response = await AppointmentServices.findLocations();
      setFetchedLocations(response.data.map((data) => data.location));
    } catch (error) {
      console.error('Error Fetching Location', error);
    }
  };

  /*################################################### 
    ################## Fetch Dates #################### 
    ################################################### */

  /* Fetch Dates under Location */
  const fetchDate = useCallback(async (location) => {
    try {
      const response = await AppointmentServices.findDatesUnderTheSelectedLocation(location);
      setFetchedDates(response.data.map((data) => data.date));
    } catch (error) {
      console.error('Error fetching dates', error);
    }
  }, []);

  /* Show FlatPicker Dates */
  flatpickr('#datePicker', {
    enable: fetchedDates,
    dateFormat: 'Y-m-d',
    defaultDate: fetchedDates[0],
    onChange: (e, dateStr) => {
      setDate(dateStr);
    },
  });

  /*################################################### 
    ################## Fetch Times #################### 
    ################################################### */

  const fetchTime = useCallback(async (location, date) => {
    try {
      const response = await AppointmentServices.findAllAvailableTimesUnderBothDateAndLocationSelection(location, date);
      setFetchedTimes(response.data.map((data) => data.time));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
    if (location !== '') {
      fetchDate(location);
      console.log(date);
    }
    if (date !== '') {
      fetchTime(location, date);
      console.log(time);
    }
  }, [location, fetchDate, date, fetchTime, time]);

  const createAnAppoinment = async (e) => {
    if (!location) {
      alert('Select a location first');
    }
    e.preventDefault();
    try {
      const appoinment = { location, date, time, status };
      await AppointmentServices.createAppoinment(appoinment);
      alert('Succusfully created an Appoinment');
      navigate('/Appointments');
    } catch (error) {
      console.error(error);
      alert('Failed to created an Appoinment');
    }
  };

  return (
    <>
      <form onSubmit={createAnAppoinment}>
        <div className="title">
          <p>Schedule</p>
          <p>Appointment</p>
        </div>

        {fetchedLocations.length > 0 ? (
          <>
            <select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setDate('');
              }}
            >
              <option required disabled value="">
                Location
              </option>
              {fetchedLocations.map((location, index) => {
                return (
                  <option key={index + 1} value={location}>
                    {location}
                  </option>
                );
              })}
            </select>
            <div className="date">
              <input
                required
                type="text"
                value={date}
                onChange={(e) => {
                  setDate();
                }}
                id="datePicker"
                placeholder="Date"
              />
            </div>
            <div className="time">
              <select value={time} required id="time" name="time" onChange={(e) => setTime(e.target.value)}>
                <option value="" disabled>
                  Time
                </option>
                {fetchedTimes.length > 0 ? (
                  <>
                    {fetchedTimes.map((time, index) => {
                      return (
                        <option required key={index + 1}>
                          {time}
                        </option>
                      );
                    })}
                  </>
                ) : (
                  <option value="" disabled selected>
                    Time
                  </option>
                )}
              </select>
            </div>
            <button className="saSubmit" type="submit">
              Book
            </button>
          </>
        ) : (
          <>
            <div className="info" />
            <p id="infop">You Cannot make appoinments today due to the lack of avaialability of donation camps</p>
          </>
        )}
      </form>
    </>
  );
}

export default ScheduleAppointment;
