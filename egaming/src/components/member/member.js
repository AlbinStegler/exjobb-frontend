import React from 'react';
import './style.css';

const Hero = () => {

    const handleButtonClick = () => {
        window.location.href = "https://ebas.sverok.se/blimedlem/etowngaming";
    };

    return (
        <div className='member-box'>
            <h1>Bli en E-Town Gamer</h1>
            <div className="member-container">
                <img src="images/je.png" alt="bild på styrelsen"></img>
                <div className='member-text'>
                    <p>Föreningen lyssnar alltid till sina medlemmar och genomför event som NI medlemmar efterfrågar, därför är det viktigt att bli medlem om du vill delta i utvecklingen av Eskilstunas e-sport och gamingkultur.</p>
                    <p>Att vara medlem kostar inget och kommer att innebära att du har möjlighet att delta på våra kommande event samt påverka vad vi ska genomföra i framtiden.</p>
                    <button onClick={handleButtonClick}>Bli Medlem</button>
                </div>

            </div>
        </div >
    );
};

export default Hero;