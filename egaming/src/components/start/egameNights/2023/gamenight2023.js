import React from "react";
import "../style.css";

const Gamenight2023 = () => {

    return (
        <div className='gamenight-container-two-col'>
            <div className="text">
                <h1>Vi ses på LAN 2024!</h1>
                <p>Tack alla som deltar på våra event. Alla arrangörer, gäster och främst alla ni deltagare! Vi kommer hålla i fler event, missa inte det genom att bli medlem!</p>
            </div>
            <div className="video-wrapper">
                <iframe src="https://www.youtube.com/embed/lK-4mDHi9hU?si=Ykb_iJOIiboJktku" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </div>
    );
}

export default Gamenight2023;