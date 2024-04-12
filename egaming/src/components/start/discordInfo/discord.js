import React from 'react';
import './style.css';
import { FaDiscord } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import arrow from '../../../lotties/arrow.json';

const Discord = () => {

    return (
        <div className='discord-info'>
            <div className='discord-info-container'>
                <p>Vår discordserver är utmärkt för att medlemmar ska kunna fortsätta prata med varandra efter eventen. Även många av våra event genomförs via vår discordserver. Anslut till vår discord genom knappen nedan och följ instruktionerna i välkomstkanalen.</p>
                <Lottie animationData={arrow}
                    loop
                    autoPlay
                    style={{ width: "100px", height: "100px" }}
                />
                <Link to="https://discord.gg/2SvuEGEy3Q"><FaDiscord size={80} /></Link>
            </div>
        </div>
    );
}

export default Discord;