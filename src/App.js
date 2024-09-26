import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appointments from './components/Appointments';
import ScheduleAppointment from './components/scheduleAppointment';
import TimePicker from './components/TimePicker';
import './main.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/scheduleAppointment" element={<ScheduleAppointment />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/TimePicker" element={<TimePicker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
