import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appointment from './components/Appointment';
import Appointments from './components/Appointments';
import Dashboard from './components/Dashboard';
import Dashboard2 from './components/Dashboard2';
import MyTimePicker from './components/MyTimePicker';
import ScheduleAppointment from './components/ScheduleAppointment';
import Sidemenu from './components/Sidemenu';
import TopBanner from './components/TopBanner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/scheduleAppointment" element={<ScheduleAppointment />} />
          <Route path="/sidemenu" element={<Sidemenu />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/myTimePicker" element={<MyTimePicker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/navbar" element={<TopBanner />} />
          <Route path="/" element={<Dashboard2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
