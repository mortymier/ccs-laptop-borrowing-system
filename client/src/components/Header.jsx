import { useLocation } from 'react-router-dom'
import citu_logo from '../images/citu_logo.png';
import '../styles/Header.css';

export default function Header()
{
    let location = useLocation();

    return (
        <header className="header">
            <a href="/"> <img src={citu_logo} alt="CIT-U Logo"/> </a>
            <a href="/" className="site-name">
                <h1 id="lbs"> LAPTOP BORROWING SYSTEM </h1>
                <h2 id="ccs"> COLLEGE OF COMPUTER STUDIES </h2>
            </a>
            <nav>
                <ul>
                    <li> <a id={location.pathname === '/' ? 'current' : ''} href="/"> Home </a> </li>
                    <li> <a id={location.pathname === '/news' ? 'current' : ''} href="/news"> News </a> </li>
                    <li> <a id={location.pathname === '/about' ? 'current' : ''} href="/about"> About </a> </li>
                    <li> <a id={location.pathname === '/contact' ? 'current' : ''} href="/contact"> Contact </a> </li>
                </ul>
            </nav>
            <div className="user-auth">
                <a href="/login"> Login </a>
                <a href="/register"> Register </a>
            </div>
        </header>
    );
}

