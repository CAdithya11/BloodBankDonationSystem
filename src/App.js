import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appointments from './components/Appointments';
import MyTimePicker from './components/MyTimePicker';
import ScheduleAppointment from './components/scheduleAppointment';
import './main.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/scheduleAppointment" element={<ScheduleAppointment />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/MyTimePicker" element={<MyTimePicker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
