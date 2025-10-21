import '../styles/Header.css';
import citu_logo from '../images/citu_logo.png'
import { useLocation, useNavigate } from 'react-router-dom';

export default function StudentHeader()
{
    let location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () =>
    {
        // Remove student data from local storage then redirect to login page
        localStorage.removeItem('loggedInStudent');
        console.log('Student has logged out');
        navigate('/login');
    };

    return (
        <header className="header">
            <a href="/studentdashboard"> <img src={citu_logo} alt="CIT-U Logo"/> </a>
            <a href="/studentdashboard" className="site-name">
                <h1 id="lbs"> LAPTOP BORROWING SYSTEM </h1>
                <h2 id="ccs"> COLLEGE OF COMPUTER STUDIES </h2>
            </a>
            <nav>
				<ul>
					<li> <a id={location.pathname === '/studentdashboard' ? 'current' : ''} href="/studentdashboard">Dashboard</a> </li>
                    <li> <a id={location.pathname === '/browselaptops' ? 'current' : ''} href="/browselaptops"> Browse </a> </li>
				</ul>
			</nav>
            <div className="user-auth">
                <button id="studentlogout" onClick={handleLogout}> Logout </button>
            </div>
        </header>
    );
}