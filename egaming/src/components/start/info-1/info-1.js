import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/your-path'); // replace '/your-path' with the path you want to navigate to
    };
    return (
        <div className='info-box'>
            <img src="images/blue_etown_logo.png" alt="banner" />
            <div className="info-container">
                <h3>En förening för spelintresserade!</h3>
                <h1>Om oss</h1>
                <p>Vi jobbar för begreppet "E-sport för alla",  e-sport där alla människor ska kunna delta, utvecklas och känna sig trygga. Vi arrangerar event, tävlingar, studiecirklar och andra aktiviteter för att främja e-sport och gamingkultur. </p>
                <button onClick={handleButtonClick}>Kommande Händelser</button>
                <div className="socials">
                    <Link to="https://www.facebook.com/etowngaming"><FaFacebook size={40} /></Link>
                    <Link to="https://www.instagram.com/etowngaming/"><FaInstagram size={40} /></Link>
                </div>
            </div>
        </div >
    );
};

export default Hero;