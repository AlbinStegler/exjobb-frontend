import React from 'react';
import './style.css';

const Hero = ({ header, img, p1, p2, buttonText, buttonLink }) => {

    const handleButtonClick = () => {
        window.location.href = buttonLink;
    };

    return (
        <div className='member-box'>
            <h1>{header}</h1>
            <div className="member-container">
                <img src={"images/" + img} alt="bild på styrelsen"></img>
                <div className='member-text'>
                    <p>{p1}</p>
                    <p>{p2}</p>
                    <button onClick={handleButtonClick}>{buttonText}</button>
                </div>

            </div>
        </div >
    );
};

export default Hero;