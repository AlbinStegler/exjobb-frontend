import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Hero = ({ img, smallHeader, header, text, buttonText, buttonLink, socials }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`${buttonLink}`);
    };
    return (
        <div className='info-box'>
            <img src={"images/" + img} alt="banner" />
            <div className="info-container">
                <h3>{smallHeader}</h3>
                <h1>{header}</h1>
                <p>{text}</p>
                <button onClick={handleButtonClick}>{buttonText}</button>
                {socials ?
                    <div className="socials">
                        <Link to="https://www.facebook.com/etowngaming"><FaFacebook size={40} /></Link>
                        <Link to="https://www.instagram.com/etowngaming/"><FaInstagram size={40} /></Link>
                    </div>
                    : null}
            </div>
        </div >
    );
};

export default Hero;