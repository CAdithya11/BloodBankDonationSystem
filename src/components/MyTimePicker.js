import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

function MyTimePicker() {
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
  });

  const getValue = (time) => {
    setTime(time);
  };

  return (
    <>
      <Select
        style={{ width: '200px', fontSize: '20px' }}
        placeholder="Time"
        allowClear
        size="large"
        options={availableTimes}
        onChange={getValue}
      />
    </>
  );
}

export default MyTimePicker;
