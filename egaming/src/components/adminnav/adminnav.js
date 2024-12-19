import React, { useEffect } from 'react';
import style from './adminnav.module.css';

import { useNavigate } from 'react-router-dom';

const StartPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
        // navigate to login page
    };
    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === false || localStorage.getItem('isLoggedIn') === null) {
            navigate('/');
            console.log('Not logged in')
        }
    });

    return (
        <div className={style.navbarAdmin}>
            <div className={style.navbarAdmin}>
                <a href="/admin">ADMIN</a>
                <a href="/create-event">SKAPA EVENT</a>
                <a href="/new-members">Nya medlemar</a>
                <a href="/" className="logout" onClick={handleLogout} >LOGGA UT</a>
            </div>
        </div>
    );

};

export default StartPage;