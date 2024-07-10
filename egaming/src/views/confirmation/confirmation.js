import React from 'react';
import Nav from '../../components/navbar/nav';
import { useLocation } from 'react-router-dom';

import './style.css';

const AdminStart = () => {
    const location = useLocation();

    const data = location.state?.userData; // Use optional chaining operator
    console.log(data);

    return (
        <>
            <Nav />
            <div className="bookingconfirmation-page">
                <div className='booking-info'>
                    <h1>Bokningsbekräftelse</h1>
                    <p>Tack för din bokning {data.firstname}! </p>
                    <p>Vi har skickat en bokningsbekräftelse till din e-post. {data.email}</p>
                    <h3>Bokningsinformation</h3>
                    <p>Event: {data.event}</p>
                    {data.seat ? <p>Plats: {data.seat.row}{data.seat.nr}</p> : <p>BESÖKSBILJETT</p>}
                    <h3>Vi ses på eventet!</h3>
                </div>
            </div>
        </>
    );
};
export default AdminStart;