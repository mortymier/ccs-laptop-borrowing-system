import '../styles/StaffDashboard.css';
import StaffHeader from '../components/StaffHeader.jsx';
import Footer from '../components/Footer.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StaffDashboard()
{
    const navigate = useNavigate();
    const [staffName, setStaffName] = useState('');
    const [pendingBorrows, setPendingBorrows] = useState([]);
    let newStatus = '';

    const showPendingBorrows = pendingBorrows.map
    (
        (borrow, index) =>
            <tr key={index}>
                <td> {borrow.borrowdate} </td>
                <td> {borrow.student.firstname} {borrow.student.lastname} </td>
                <td> {borrow.schedule.course} - {borrow.schedule.section} </td>
                <td> {borrow.schedule.start} - {borrow.schedule.end} </td>
                <td> {borrow.laptop.brand} - {borrow.laptop.model} </td>
                <td> {borrow.reason} </td>
                <td>
                     <button onClick={() => {handleApprove(); handleAction(borrow)}}> APPROVE </button> 
                     <button onClick={() => {handleReject(); handleAction(borrow)}}> REJECT </button>
                </td>
            </tr>
    );

    const handleApprove = () =>
    {
        newStatus = 'APPROVED';
    };

    const handleReject = () =>
    {
        newStatus = 'REJECTED';
    };

    const handleAction = async(borrow) =>
    {
        const updateBorrow = borrow;

        try
        {
            const response = await fetch
            (
                `http://localhost:8080/api/borrows/status-update/${newStatus}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateBorrow)
                }
            );

            if(response.ok && newStatus === 'APPROVED')
            {
                const updatedLaptop = borrow.laptop;
                const newLaptopStatus = 'BORROWED';
                console.log(updatedLaptop);

                try
                {
                    const response2 = await fetch
                    (
                        `http://localhost:8080/api/laptops/${newLaptopStatus}`,
                        {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updatedLaptop)
                        }
                    );

                    if(response2.ok)
                    {
                        alert('APPROVED: ' + borrow.laptop.brand + ' - ' + borrow.laptop.model + ' - ' + borrow.student.firstname + ' ' + borrow.student.lastname);
                        window.location.reload();
                    }
                    else
                    {
                        throw new Error('Failed to approve request');
                    }
                }
                catch(error)
                {
                    console.error(error);
                    alert(error.message);
                }                
            }
            else if(response.ok && newStatus === 'REJECTED')
            {
                alert('REJECTED: ' + borrow.laptop.brand + ' - ' + borrow.laptop.model + ' - ' + borrow.student.firstname + ' ' + borrow.student.lastname);
                window.location.reload();
            }
            else
            {
                throw new Error('Failed to approve request');
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
        // Get logged-in staff's data from local storage
        const loggedInStaff = localStorage.getItem('loggedInStaff');
        
        if(!loggedInStaff)
        {
            navigate('/'); // Prevent unauthenticated users from accessing dashboard
        }
        else
        {
            const staffData = JSON.parse(loggedInStaff);
            const borrowStatus = 'REVIEWING';
            setStaffName(staffData.firstname + ' ' + staffData.lastname);

            const fetchPendingBorrows = async() =>
            {
                try
                {
                    const response = await fetch
                    (
                        `http://localhost:8080/api/borrows/status?borrowstatus=${encodeURIComponent(borrowStatus)}`
                    );

                    if(response.ok)
                    {
                        const fetchedPendingBorrows = await response.json();
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

            fetchPendingBorrows();
        }

    }, [navigate]);

    return (
        <>
            <title> Staff Dashboard </title>
            <StaffHeader/>
            <main className="staffdashboard">
                <h1> Welcome Staff, {staffName} </h1>

                <h2> Pending Borrow Requests </h2>
                <table className="pendingborrows2">
                    <thead>
                        <tr>
                            <th> Borrow Date </th>
                            <th> Student </th>
                            <th> Course </th>
                            <th> Schedule </th>
                            <th> Laptop </th>
                            <th> Reason </th>
                            <th> Actions </th>
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