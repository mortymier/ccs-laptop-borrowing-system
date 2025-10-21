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
                </main>
            <Footer/>
        </>
    );
}