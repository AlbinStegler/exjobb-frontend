import React from 'react';
import './style.css';

const Hero = ({ contentText, contentUrl, backgroundUrl }) => {

    const video = backgroundUrl.split('.').pop() === 'webm';

    return (
        <div className="hero">
            {video ?
                <video className="background-video" autoPlay loop muted>
                    <source src={process.env.PUBLIC_URL + "images/" + backgroundUrl} type="video/webm" alt="backgroundvideo" />
                </video>
                :
                <div>
                    <img src={process.env.PUBLIC_URL + "images/" + backgroundUrl} alt="backgroundvideo" />
                </div>
            }
            <div className='hero-content'>
                <img src={"images/" + contentUrl} alt="banner" />
                <h1>{contentText}</h1>
            </div>
        </div >
    );
};

export default Hero;