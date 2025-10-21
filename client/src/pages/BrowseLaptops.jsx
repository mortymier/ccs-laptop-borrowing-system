import '../styles/BrowseLaptops.css';
import StudentHeader from "../components/StudentHeader.jsx";
import Footer from '../components/Footer.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BrowseLaptops() {
    const navigate = useNavigate();
    const [laptops, setLaptops] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formLaptop, setFormLaptop] = useState({});
    const [formInput, setFormInput] = useState({ reason: '', scheduleCourse: '' });

    const fetchAllLaptops = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/laptops');
            if (response.ok) {
                const fetchedLaptops = await response.json();
                setLaptops(fetchedLaptops);
            } else throw new Error('Failed to fetch laptops');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const fetchStudentSchedules = async () => {
        const loggedInStudent = localStorage.getItem('loggedInStudent');
        const studentData = JSON.parse(loggedInStudent);
        const studentEmail = studentData.email;

        try {
            const response = await fetch(
                `http://localhost:8080/api/schedules/student?email=${encodeURIComponent(studentEmail)}`
            );
            if (response.ok) {
                const fetchedSchedules = await response.json();
                setSchedules(fetchedSchedules);
            } else throw new Error('Failed to fetch student schedules');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const showSchedulesAsOptions = schedules.map((schedule, index) => (
        <option key={index} value={schedule.course}>
            {schedule.course} - {schedule.section}
        </option>
    ));

    const handleClickCard = (laptop) => {
        if (laptop.laptopstatus === 'AVAILABLE') {
            setFormLaptop(laptop);
            setShowForm(true);
        } else {
            alert('This laptop is not available for borrowing');
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setFormLaptop({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loggedInStudent = localStorage.getItem('loggedInStudent');
        const studentData = JSON.parse(loggedInStudent);
        const studentEmail = studentData.email;
        const scheduleCourse = formInput.scheduleCourse;
        const laptopBrand = formLaptop.brand;
        const laptopModel = formLaptop.model;

        try {
            const response = await fetch(
                `http://localhost:8080/api/borrows/add?email=${encodeURIComponent(studentEmail)}&course=${encodeURIComponent(scheduleCourse)}&brand=${encodeURIComponent(laptopBrand)}&model=${encodeURIComponent(laptopModel)}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formInput),
                }
            );

            if (response.ok) {
                setFormLaptop({});
                setFormInput({ reason: '', scheduleCourse: '' });
                setShowForm(false);
                alert('Borrow request has been created!');
            } else throw new Error('Request failed');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchAllLaptops();
        fetchStudentSchedules();
    }, [navigate, showForm, formInput]);

    const showLaptops = laptops.map((laptop, index) => (
        <div
            key={index}
            className={`laptop-card ${laptop.laptopstatus !== 'AVAILABLE' ? 'unavailable' : ''}`}
            onClick={() => handleClickCard(laptop)}
        >
            {/* ✅ Photo Display */}
            {laptop.photoFile ? (
                <img
                    src={`http://localhost:8080/api/laptops/photo/${laptop.photoFile}`}
                    alt={`${laptop.brand} ${laptop.model}`}
                    className="laptop-photo"
                />
            ) : (
                <img
                    src="/default-laptop.png"
                    alt="No photo available"
                    className="laptop-photo"
                />
            )}

            <h2>{laptop.brand} - {laptop.model}</h2>
            <p>RAM: {laptop.ram}</p>
            <p>CPU: {laptop.cpu}</p>
            <p>Storage: {laptop.storage}</p>
            <p>
                Status:{" "}
                <span className={laptop.laptopstatus === 'AVAILABLE' ? 'status1' : 'status2'}>
                    {laptop.laptopstatus}
                </span>
            </p>
        </div>
    ));

    return (
        <>
            <title>Browse Laptops</title>
            <StudentHeader />
            <main className="browse-laptops">
                <div className="laptop-grid">{showLaptops}</div>
            </main>

            {showForm && (
                <form className="borrowform" onSubmit={handleSubmit}>
                    <h2>Borrow this laptop?</h2>
                    <p>
                        {formLaptop.brand} - {formLaptop.model} <br />
                        {formLaptop.ram}, {formLaptop.cpu}, {formLaptop.storage}
                    </p>

                    <label htmlFor="schedule">Schedule</label>
                    <select
                        id="schedule"
                        name="schedule"
                        value={formInput.scheduleCourse}
                        onChange={(e) =>
                            setFormInput((prev) => ({ ...prev, scheduleCourse: e.target.value }))
                        }
                        required
                    >
                        <option> </option>
                        {showSchedulesAsOptions}
                    </select>

                    <label htmlFor="reason">Reason</label>
                    <textarea
                        id="reason"
                        name="reason"
                        rows="5"
                        value={formInput.reason}
                        onChange={(e) =>
                            setFormInput((prev) => ({ ...prev, reason: e.target.value }))
                        }
                        required
                    />

                    <div>
                        <button id="submit" type="submit">Submit</button>
                        <button id="close" type="button" onClick={handleCloseForm}>Close</button>
                    </div>
                </form>
            )}

            <Footer />
        </>
    );
}
