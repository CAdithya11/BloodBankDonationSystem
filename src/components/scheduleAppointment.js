import flatpickr from 'flatpickr';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentServices from '../Service/AppointmentService';
import { Select } from 'antd';

function ScheduleAppointment() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();
  const status = 'Approved';

  const [fetchedLocations, setFetchedLocations] = useState([]);
  const [fetchedDates, setFetchedDates] = useState([]);
  const disabled = [{ time: '08:00:00' }, { time: '09:00:00' }];
  const appoinment = { location, date, time, status };
  const [fetchedTimes, setFetchedTimes] = useState([]);

  const [disable, setDisable] = useState(true);

  const submitButton = document.querySelector('.AsaSubmit');

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

  useEffect(() => {
    const disabledTimes = disabled.map((item) => item.time);
    const Time = available.filter((time) => !disabledTimes.includes(time.value));
    setAvailableTimes(Time);
  }, [setAvailableTimes, disabled, flatpickr]);

  const getValue = (time) => {
    setTime(time);
  };

  /* Fetch Locations */
  const fetchLocation = async () => {
    try {
      const response = await AppointmentServices.findLocations();
      setFetchedLocations(response.data.map((data) => data.location));
    } catch (error) {
      console.error('Error Fetching Location', error);
    }
  };

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
  useEffect(() => {
    if (fetchedDates.length > 0) {
      flatpickr('#datePicker', {
        disable: fetchedDates,
        dateFormat: 'Y-m-d',
        defaultDate: fetchedDates[0],
        onChange: (e, dateStr) => {
          setDate(dateStr);
        },
      });
    }
  }, [fetchedDates]);

  /* Fetch Times */
  const fetchTime = useCallback(async (location, date) => {
    try {
      const response = await AppointmentServices.findAllAvailableTimesUnderBothDateAndLocationSelection(location, date);
      setFetchedTimes(response.data.map((data) => data.time));
    } catch (error) {
      console.error(error);
    }
  }, []);

  /* Use Effect to controll disable true false */

  useEffect(() => {
    if (location === null || location === '') {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [location]);

  //Submit button

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
    } else {
      if (!date) {
        alert('Select a date first');
      } else {
        if (!time) {
          alert('Select a time first');
        } else {
          try {
            await AppointmentServices.createAppoinment(appoinment);
            alert('Succusfully created an Appoinment');
            navigate('/Appointments');
          } catch (error) {
            console.error(error);
            alert('Failed to created an Appoinment');
          }
        }
      }
    }

    e.preventDefault();
  };

  return (
    <>
      <form style={window.innerWidth > 800 ? {} : { transform: 'scale(0.6)' }} onSubmit={createAnAppoinment}>
        <div className="Atitle">
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
            <div className="Adate">
              <input
                disabled={disable}
                required
                type="text"
                value={date}
                readOnly={fetchedLocations === 0}
                onChange={(e) => {
                  setDate();
                }}
                id="datePicker"
                placeholder="Date"
                onClick={(e) => {
                  if (!fetchedDates.length > 0) {
                    alert('Pick a location at first');
                  }
                }}
              />
            </div>
            <div className="Atime">
              <Select
                required
                placeholder="Time"
                allowClear
                size="large"
                options={availableTimes}
                onChange={getValue}
              />
            </div>
            <button
              className={
                appoinment.location === '' || appoinment.date === '' || appoinment.time === ''
                  ? 'AsaSubmit'
                  : 'change-color'
              }
              type="submit"
            >
              Book
            </button>
          </>
        ) : (
          <>
            <div className="Ainfo" />
            <p id="infop">You Cannot make appoinments today due to the lack of avaialability of donation camps</p>
          </>
        )}
      </form>
    </>
  );
}

export default ScheduleAppointment;
