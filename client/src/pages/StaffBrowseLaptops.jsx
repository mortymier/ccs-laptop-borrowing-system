import '../styles/BrowseLaptops.css';
import StaffHeader from "../components/StaffHeader.jsx";
import Footer from '../components/Footer.jsx';
import { useEffect, useState } from 'react';

export default function StaffBrowseLaptops() {
    const [laptops, setLaptops] = useState([]);

    // Fetch all laptops
    const fetchAllLaptops = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/laptops');
            if (response.ok) {
                const fetchedLaptops = await response.json();
                setLaptops(fetchedLaptops);
            } else {
                throw new Error('Failed to fetch laptops');
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Mark a laptop as returned (AVAILABLE)
    const handleReturn = async (laptop) => {
        try {
            const confirmReturn = window.confirm("Mark this laptop as RETURNED?");
            if (!confirmReturn) return;

            // Send PUT request with new status and laptop data
            const response = await fetch(
                `http://localhost:8080/api/laptops/AVAILABLE`, 
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(laptop)
                }
            );

            if (response.ok) {
                alert("Laptop has been marked as AVAILABLE.");
                fetchAllLaptops(); // Refresh laptop list
            } else {
                throw new Error("Failed to update laptop status.");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Show all laptops
    const showLaptops = laptops.map((laptop, index) => (
        <div key={index} className="laptop-card">
            <h2>{laptop.brand} - {laptop.model}</h2>
            <p>RAM: {laptop.ram}</p>
            <p>CPU: {laptop.cpu}</p>
            <p>Storage: {laptop.storage}</p>
            <p>Status: <span className={laptop.laptopstatus === 'AVAILABLE' ? 'status1' : 'status2'}>{laptop.laptopstatus}</span></p>

            {laptop.laptopstatus === 'BORROWED' && (
                <button className="return-btn" onClick={() => handleReturn(laptop)}>
                    Return
                </button>
            )}
        </div>
    ));

    useEffect(() => {
        fetchAllLaptops();
    }, []);

    return (
        <>
            <title>Staff Browse Laptops</title>
            <StaffHeader/>
            <main className="browse-laptops">
                <div className="laptop-grid">
                    {showLaptops}
                </div>
            </main>
            <Footer/>
        </>
    );
}
