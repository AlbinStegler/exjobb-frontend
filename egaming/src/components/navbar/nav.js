import React, { useEffect } from 'react';
import './style.css';



const StartPage = () => {
    let location = window.location.pathname;
    useEffect(() => {
        try {
            document.getElementById(location).classList.add('active');
        } catch (error) {
            console.log('No active class to add');
        }
    }, [location]);
    return (
        <div className='navbar'>
            <div className='login'>

            </div>
            <div className='nav-center' >
                <a id="/" href="/">START</a>
                <a
                    className="member-button"
                    href="/sverok-register"
                >BLI MEDLEM</a>
                <a id="/events" href="/events">EVENT</a>
            </div>
            <div>
                <a className="login" href="/login">login</a>
            </div>
        </div>
    );
};

export default StartPage;