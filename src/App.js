import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appointments from './components/Appointments';
import Dashboard from './components/Dashboard';
import Dashboard2 from './components/Dashboard2';
import MyTimePicker from './components/MyTimePicker';
import ScheduleAppointment from './components/ScheduleAppointment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/scheduleAppointment" element={<ScheduleAppointment />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/myTimePicker" element={<MyTimePicker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<Dashboard2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
