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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

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
        setError('');
        setIsSubmitting(true);
        
        // Validate form data
        if (!formInput.schoolyear || !formInput.semester || !formInput.course || 
            !formInput.section || !formInput.start || !formInput.end) {
            setError('Please fill in all fields');
            setIsSubmitting(false);
            return;
        }

        // Validate time format
        if (formInput.start >= formInput.end) {
            setError('End time must be after start time');
            setIsSubmitting(false);
            return;
        }

        const loggedInStudent = localStorage.getItem('loggedInStudent');
        if (!loggedInStudent) {
            setError('Please log in to add schedules');
            setIsSubmitting(false);
            return;
        }

        const studentData = JSON.parse(loggedInStudent);
        const studentEmail = studentData.email;

        try {
            console.log('Submitting schedule:', formInput);
            console.log('Student email:', studentEmail);
            
            const response = await fetch(`http://localhost:8080/api/schedules/student?email=${encodeURIComponent(studentEmail)}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formInput)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (response.ok) {
                const newSchedule = await response.json();
                console.log('Schedule created successfully:', newSchedule);
                
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
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Failed to add schedule: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error details:', error);
            setError(error.message);
        } finally {
            setIsSubmitting(false);
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
                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}
                            <div className="formfield">
                                <label htmlFor="schoolyear"> School Year </label>
                                <input 
                                    id="schoolyear" 
                                    name="schoolyear" 
                                    type="text" 
                                    value={formInput.schoolyear} 
                                    onChange={handleChange} 
                                    placeholder="e.g., 2024 - 2025"
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
                                    placeholder="e.g., CSIT340"
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
                                    placeholder="e.g., G1"
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
                                <button 
                                    type="submit" 
                                    className="submit-btn" 
                                    disabled={isSubmitting}
                                > 
                                    {isSubmitting ? 'Adding...' : 'Add Schedule'} 
                                </button>
                                <button 
                                    type="button" 
                                    className="cancel-btn" 
                                    onClick={() => {
                                        setShowForm(false);
                                        setError('');
                                        setFormInput({
                                            schoolyear: '',
                                            semester: '',
                                            course: '',
                                            section: '',
                                            start: '',
                                            end: ''
                                        });
                                    }}
                                    disabled={isSubmitting}
                                > 
                                    Cancel 
                                </button>
                            </div>
                        </form>
                    )}
                </main>
            <Footer/>
        </>
    );
}