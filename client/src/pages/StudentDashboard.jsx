import '../styles/StudentDashboard.css';
import StudentHeader from "../components/StudentHeader.jsx";
import Footer from '../components/Footer.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard()
{
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState('');
    const [approvedBorrows, setApprovedBorrows] = useState([]);
    const [pendingBorrows, setPendingBorrows] = useState([]);

    const showApprovedBorrows = approvedBorrows.map
    (
        (borrow, index) => 
            <tr key={index}> 
                <td> {borrow.borrowdate} </td>
                <td> {borrow.schedule.course} - {borrow.schedule.section} </td>
                <td> {borrow.schedule.start} - {borrow.schedule.end} </td>
                <td> {borrow.laptop.brand} - {borrow.laptop.model} </td>
                <td> {borrow.laptop.ram} </td>
                <td> {borrow.laptop.cpu} </td>
                <td> {borrow.laptop.storage} </td>
                <td> {borrow.reason} </td>
                <td> {borrow.borrowstatus} </td>
            </tr>
    );

    const showPendingBorrows = pendingBorrows.map
    (
        (borrow, index) =>
            <tr key={index}>
                <td> {borrow.borrowdate} </td>
                <td> {borrow.schedule.course} - {borrow.schedule.section} </td>
                <td> {borrow.schedule.start} - {borrow.schedule.end} </td>
                <td> {borrow.laptop.brand} - {borrow.laptop.model} </td>
                <td> {borrow.laptop.ram} </td>
                <td> {borrow.laptop.cpu} </td>
                <td> {borrow.laptop.storage} </td>
                <td> {borrow.reason} </td>
                <td> {borrow.borrowstatus} </td>
            </tr>
    );

    useEffect(() => 
    {
        // Get logged-in student's data from local storage
        const loggedInStudent = localStorage.getItem('loggedInStudent');

        if(!loggedInStudent)
        {
            navigate('/login'); // Prevent unauthenticated users from accessing dashboard
        }
        else
        {
            const studentData = JSON.parse(loggedInStudent);
            //console.log('Student Data:', studentData);
            const studentEmail = studentData.email;
            let borrowstatus;
            setStudentName(studentData.firstname + ' ' + studentData.lastname);

            const fetchApprovedBorrows = async() =>
            {
                borrowstatus = 'APPROVED';

                try
                {
                    const response = await fetch
                    (
                        `http://localhost:8080/api/borrows/status-student?email=${encodeURIComponent(studentEmail)}&borrowstatus=${encodeURIComponent(borrowstatus)}`
                    );

                    if(response.ok)
                    {
                        const fetchedApprovedBorrows = await response.json();
                        //console.log('Approved borrows:', fetchedApprovedBorrows);
                        setApprovedBorrows(fetchedApprovedBorrows);
                    }
                    else
                    {
                        throw new Error('Failed to fetch approved borrows');
                    }
                }
                catch(error)
                {
                    console.error(error);
                    alert(error.message);
                }
            };

            const fetchPendingBorrows = async() =>
            {
                borrowstatus= 'REVIEWING';

                try
                {
                    const response = await fetch
                    (
                        `http://localhost:8080/api/borrows/status-student?email=${encodeURIComponent(studentEmail)}&borrowstatus=${encodeURIComponent(borrowstatus)}`
                    );

                    if(response.ok)
                    {
                        const fetchedPendingBorrows = await response.json();
                        //console.log('Pending borrows:', fetchedPendingBorrows);
                        setPendingBorrows(fetchedPendingBorrows);
                    }
                    else
                    {
                        throw new Error('Failed to fetch pending borrows');
                    }
                }
                catch(error)
                {
                    console.error(error);
                    alert(error.message);
                }
            };

            fetchApprovedBorrows();
            fetchPendingBorrows();
        }

    }, [navigate]);

    return (
        <>
            <title> Student Dashboard </title>
            <StudentHeader/>
            <main className="studentdashboard">
                <h1> Welcome student, {studentName}! </h1>

                <h2> Approved Borrows </h2>
                <table className="approvedborrows">
                    <thead>
                        <tr>
                            <th> Borrow Date </th>
                            <th> Course </th>
                            <th> Time </th>
                            <th> Laptop </th>
                            <th> RAM </th>
                            <th> CPU </th>
                            <th> Storage </th>
                            <th> Reason </th>
                            <th> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showApprovedBorrows}
                    </tbody>
                </table>

                <h2> Pending Borrows </h2>
                <table className="pendingborrows">
                    <thead>
                        <tr>
                            <th> Borrow Date </th>
                            <th> Course </th>
                            <th> Time </th>
                            <th> Laptop </th>
                            <th> RAM </th>
                            <th> CPU </th>
                            <th> Storage </th>
                            <th> Reason </th>
                            <th> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showPendingBorrows}
                    </tbody>
                </table>
            </main>
            <Footer/>
        </>
    );
}