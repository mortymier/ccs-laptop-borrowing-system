import '../styles/AddLaptop.css';
import StaffHeader from '../components/StaffHeader.jsx';
import Footer from '../components/Footer.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddLaptop()
{
    const navigate = useNavigate();
    const [formInput , setFormInput] = useState
    ({
        brand: '',
        model: '',
        ram: '',
        cpu: '',
        storage: '',
        price: 0
    });

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setFormInput({...formInput, [name]: value});
    };

    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        window.confirm('Proceed with adding laptop?');

        try
        {
            const response = await fetch
            (
                'http://localhost:8080/api/laptops',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formInput)
                }
            );
git
            if(response.ok)
            {
                const laptopData = await response.json();
                console.log('Added successfully:', laptopData);
                alert('Laptop has been added!');
                navigate('/staffdashboard');
            }
            else
            {
                throw new Error('Failed to add laptop');
            }
        }
        catch(error)
        {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <>
            <title> Staff - Add Laptop </title>
            <StaffHeader/>
            <main className="addlaptop">
                <form onSubmit={handleSubmit}>
                    <h1> Staff - Add Laptop </h1>
                    <h2> Please fill out the form </h2>
                    <hr/>
                
                    <div className="formfield">
                        <label htmlFor="brand"> Brand </label>
                        <input id="brand" name="brand" type="text" value={formInput.brand} onChange={handleChange} required/>
                    </div>

                    <div className="formfield">
                        <label htmlFor="model"> Model </label>
                        <input id="model" name="model" type="text" value={formInput.model} onChange={handleChange} required/>
                    </div>

                    <div className="formfield">
                        <label htmlFor="ram"> RAM </label>
                        <input id="ram" name="ram" type="text" value={formInput.ram} onChange={handleChange} required/>
                    </div>

                    <div className="formfield">
                        <label htmlFor="cpu"> CPU </label>
                        <input id="cpu" name="cpu" type="text" value={formInput.cpu} onChange={handleChange} required/>
                    </div>

                    <div className="formfield">
                        <label htmlFor="storage"> Storage </label>
                        <input id="storage" name="storage" type="text" value={formInput.storage} onChange={handleChange} required/>
                    </div>

                    <div className="formfield">
                        <label htmlFor="price"> Price </label>
                        <input id="price" name="price" type="number" value={formInput.price} onChange={handleChange} min="0" required/>
                    </div>

                     <div className="buttons">
                        <button type="submit" id="submitForm"> Add Laptop </button>
                    </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}