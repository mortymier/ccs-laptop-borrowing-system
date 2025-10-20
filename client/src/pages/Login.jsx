import '../styles/Login.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login()
{
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async(e) =>
    {
        e.preventDefault();

        try
        {
            const response = await fetch
            (
                `http://localhost:8080/api/${role}s/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            if(response.ok && role === 'student')
            {
                // Save student data to local storage then redirect to dashboard
                const studentData = await response.json();
                localStorage.setItem('loggedInStudent', JSON.stringify(studentData));
                navigate('/studentdashboard');
            }
            else if(response.ok && role === 'staff')
            {
                // Save staff data to local storage then redirect to dashboard
                const staffData = await response.json();
                localStorage.setItem('loggedInStaff', JSON.stringify(staffData));
                navigate('/staffdashboard');
            }
            else if(response.status === 401)
            {
                throw new Error('Invalid role, email, or password');
            }
            else
            {
                throw new Error('Login failed');
            }
        }
        catch(error)
        {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <>
            <title> Login - Laptop Borrowing System </title>
            <Header/>
            <main className="login">
                <form onSubmit={handleLogin}>
                    <h1> Welcome, Wildcat </h1>
                    <p> Please enter your information </p>
                    <hr/>

                    <label htmlFor="role">Role</label>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="staff">Staff</option>
                    </select>

                    <label htmlFor="email"> Email </label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="password"> Password </label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <button type="submit"> Login </button>
                </form>
            </main>
            <Footer/>
        </>
    );
}