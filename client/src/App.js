import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/Global.css';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RegisterStudent from './pages/RegisterStudent.jsx';
import RegisterStaff from './pages/RegisterStaff.jsx';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}