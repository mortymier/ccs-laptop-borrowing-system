import '../styles/Schedules.css';
import StudentHeader from "../components/StudentHeader.jsx";
import Footer from '../components/Footer.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Schedules()
{
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formInput, setFormInput] = useState({
        schoolyear: '',
        semester: '',
        course: '',
        section: '',
        start: '',
        end: ''
    });

    const showSchedules = schedules.map
    (
        (schedule, index) =>
            <tr key={index}>
                <td> {schedule.schoolyear} </td>
                <td> {schedule.semester} </td>
                <td> {schedule.course} </td>
                <td> {schedule.section} </td>
                <td> {schedule.start} - {schedule.end} </td>
            </tr>
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loggedInStudent = localStorage.getItem('loggedInStudent');
        const studentData = JSON.parse(loggedInStudent);
        const studentEmail = studentData.email;

        try {
            const response = await fetch('http://localhost:8080/api/schedules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formInput,
                    studentEmail: studentEmail
                })
            });

            if (response.ok) {
                alert('Schedule added successfully!');
                setFormInput({
                    schoolyear: '',
                    semester: '',
                    course: '',
                    section: '',
                    start: '',
                    end: ''
                });
                setShowForm(false);
                fetchStudentSchedules(); // Refresh the schedules list
            } else {
                throw new Error('Failed to add schedule');
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const fetchStudentSchedules = async() =>
    {
        const loggedInStudent = localStorage.getItem('loggedInStudent');
        const studentData = JSON.parse(loggedInStudent);
        const studentEmail = studentData.email;
        setStudentName(studentData.firstname + ' ' + studentData.lastname);

        try
        {
            const response = await fetch
            (
                `http://localhost:8080/api/schedules/student?email=${encodeURIComponent(studentEmail)}`
            );

            if(response.ok)
            {
                const fetchedSchedules = await response.json();
                setSchedules(fetchedSchedules);
            }
            else
            {
                throw new Error('Failed to fetch student schedules');
            }
        }
        catch(error)
        {
            console.error(error);
            alert(error.message);
        }
    };

    useEffect(() => 
    {
        fetchStudentSchedules();

    }, [navigate])

    return (
        <>
            <title> Student Schedules </title>
            <StudentHeader/>
                <main className="schedules">
                    <h2> These are the list of schedules for {studentName}: </h2>
                    
                    <div className="schedules-actions">
                        <button 
                            className="add-schedule-btn" 
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? 'Cancel' : 'Add New Schedule'}
                        </button>
                    </div>

                    {showForm && (
                        <form className="schedule-form" onSubmit={handleSubmit}>
                            <h3> Add New Schedule </h3>
                            <div className="formfield">
                                <label htmlFor="schoolyear"> School Year </label>
                                <input 
                                    id="schoolyear" 
                                    name="schoolyear" 
                                    type="text" 
                                    value={formInput.schoolyear} 
                                    onChange={handleChange} 
                                    placeholder="e.g., 2024-2025"
                                    required 
                                />
                            </div>

                            <div className="formfield">
                                <label htmlFor="semester"> Semester </label>
                                <select 
                                    id="semester" 
                                    name="semester" 
                                    value={formInput.semester} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">Select Semester</option>
                                    <option value="1st Semester">1st Semester</option>
                                    <option value="2nd Semester">2nd Semester</option>
                                    <option value="Summer">Summer</option>
                                </select>
                            </div>

                            <div className="formfield">
                                <label htmlFor="course"> Course </label>
                                <input 
                                    id="course" 
                                    name="course" 
                                    type="text" 
                                    value={formInput.course} 
                                    onChange={handleChange} 
                                    placeholder="e.g., BSIT"
                                    required 
                                />
                            </div>

                            <div className="formfield">
                                <label htmlFor="section"> Section </label>
                                <input 
                                    id="section" 
                                    name="section" 
                                    type="text" 
                                    value={formInput.section} 
                                    onChange={handleChange} 
                                    placeholder="e.g., A"
                                    required 
                                />
                            </div>

                            <div className="formfield">
                                <label htmlFor="start"> Start Time </label>
                                <input 
                                    id="start" 
                                    name="start" 
                                    type="time" 
                                    value={formInput.start} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>

                            <div className="formfield">
                                <label htmlFor="end"> End Time </label>
                                <input 
                                    id="end" 
                                    name="end" 
                                    type="time" 
                                    value={formInput.end} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>

                            <div className="buttons">
                                <button type="submit" className="submit-btn"> Add Schedule </button>
                                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}> Cancel </button>
                            </div>
                        </form>
                    )}

                    <table className="schedules-table">
                        <thead>
                            <tr>
                                <th> School Year </th>
                                <th> Semester </th>
                                <th> Course </th>
                                <th> Section </th>
                                <th> Time </th>
                            </tr>
                        </thead>
                        <tbody>
                            {showSchedules}
                        </tbody>
                    </table>
                </main>
            <Footer/>
        </>
    );
}