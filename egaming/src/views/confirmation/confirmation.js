import React, { useEffect } from 'react';
import Nav from '../../components/navbar/nav';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';

import './style.css';

const AdminStart = () => {
    const location = useLocation();
    const data = location.state?.userData;

    // REACT_APP_EMAIL_PUBLIC_KEY
    // REACT_APP_EMAIL_TEMPLATE_ID
    // REACT_APP_EMAIL_SERVICE_ID
    useEffect(() => {
        // This will run only once when the component mounts
        const sendEmail = async () => {
            let email = {
                "from_name": "info@etowngaming.com",  // The name of the sender (user's name)
                "from_email": data?.email,     // The user's email address
                "to_name": data?.firstname,    // The name of the recipient (user's name)
                "to_email": data?.email,       // The recipient email (user's email)
                "nickname": data?.nickname,
                "seat": `Bokad plats ${data?.seat?.row}${data?.seat?.nr}`
            };

            try {
                await emailjs.send(
                    process.env.REACT_APP_EMAIL_SERVICE_ID,
                    process.env.REACT_APP_EMAIL_TEMPLATE_ID,
                    email,
                    process.env.REACT_APP_EMAIL_PUBLIC_KEY
                );
                console.log("Email sent successfully!");
            } catch (error) {
                console.error("Error sending email:", error);
            }
        };

        sendEmail();
    }, [data]); // Empty dependency array means this runs once on mount

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