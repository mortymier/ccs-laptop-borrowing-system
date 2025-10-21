import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/Global.css';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RegisterStudent from './pages/RegisterStudent.jsx';
import RegisterStaff from './pages/RegisterStaff.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import BrowseLaptops from './pages/BrowseLaptops.jsx';
import Schedules from './pages/Schedules.jsx';
import StaffDashboard from './pages/StaffDashboard.jsx';
import AddLaptop from './pages/AddLaptop.jsx';

export default function App()
{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="registerstudent" element={<RegisterStudent/>}/>
          <Route path="registerstaff" element={<RegisterStaff/>}/>
          <Route path="studentdashboard" element={<StudentDashboard/>}/>
          <Route path="browselaptops" element={<BrowseLaptops/>}/>
          <Route path="schedules" element={<Schedules/>}/>
          <Route path="staffdashboard" element={<StaffDashboard/>}/>
          <Route path="addlaptop" element={<AddLaptop/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}