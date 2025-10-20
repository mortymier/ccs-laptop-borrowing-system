import '../styles/RegisterStudent.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterStudent()
{
    const navigate = useNavigate();
    const [formData, setFormData] = useState
    ({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        contactnum: '',
        program: '',
        yearlvl: ''
    });

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async(e) => 
    {
        e.preventDefault();
        window.confirm('Proceed with registration?');

        try
        {
            const response = await fetch
            (
                'http://localhost:8080/api/students/register',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                }
            );

            if(response.ok)
            {
                const data = await response.json();
                console.log('Registered successfully:', data);
                alert('Registration successful!');
                navigate('/login');
            }
            else if(response.status === 500 || response.status === 403)
            {
                throw new Error('Email is already used');
            }
            else
            {
                throw new Error('Registration failed');
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
            <title> Register Student - Laptop Borrowing System </title>
            <Header/>
            <main className="registerstudent">
                <form onSubmit={handleSubmit}>
                    <h1> Register Student </h1>
                    <h2> Please fill out the form </h2>
                    <hr/>

                    <div className="formfield">
                        <label htmlFor="firstname"> First Name </label>
                        <input id="firstname" name="firstname" type="text" value={formData.firstname} onChange={handleChange} required/>
                    </div>

                    <div className="formfield">
                        <label htmlFor="lastname"> Last Name </label>
                        <input id="lastname" name="lastname" type="text" value={formData.lastname} onChange={handleChange} required/>
                    </div>

                    <div className="formfield">
                        <label htmlFor="program"> Program </label>
                        <input id="program" name="program" type="text" value={formData.program} onChange={handleChange} required/>
                    </div>

                    <div className="formfield">
                        <label htmlFor="yearlvl"> Year </label>
                        <input id="yearlvl" name="yearlvl" type="number" min="1" max="6" value={formData.yearlvl} onChange={handleChange} required/>
                    </div>

                     <div className="formfield">
                        <label htmlFor="contactnum"> Number </label>
                        <input id="contactnum" name="contactnum" type="text" value={formData.contactnum} onChange={handleChange} required/>
                    </div>

                    <div className="formfield">
                        <label htmlFor="email"> Email </label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required/>
                    </div>

                    <div className="formfield">
                        <label htmlFor="password"> Password </label>
                        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required/>
                    </div>

                    <div className="buttons">
                        <a href="register"> <button type="button" id="goBack"> Back </button> </a>
                        <button type="submit" id="submitForm"> Register </button>
                    </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}