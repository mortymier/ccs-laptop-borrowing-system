import '../styles/Header.css';
import citu_logo from '../images/citu_logo.png'
import { useLocation, useNavigate } from 'react-router-dom';

export default function StaffHeader()
{
    let location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () =>
    {
        // Remove staff data from local storage then redirect to login page
        localStorage.removeItem('loggedInStaff');
        console.log('Staff has logged out');
        navigate('/login');
    };

    return (
        <header className="header">
            <a href="/staffdashboard"> <img src={citu_logo} alt="CIT-U Logo"/> </a>
            <a href="/staffdashboard" className="site-name">
                <h1 id="lbs"> LAPTOP BORROWING SYSTEM </h1>
                <h2 id="ccs"> COLLEGE OF COMPUTER STUDIES </h2>
            </a>
            <nav>
				<ul>
                    <li> <a id={location.pathname === '/staffdashboard' ? 'current' : ''} href="/staffdashboard"> Dashboard </a> </li>
					<li> <a id={location.pathname === '/addlaptop' ? 'current' : ''} href="/addlaptop"> Add Laptop </a> </li>
				</ul>
			</nav>
            <div className="user-auth">
                <button id="stafflogout" onClick={handleLogout}> Logout </button>
            </div>
        </header>
    );
}