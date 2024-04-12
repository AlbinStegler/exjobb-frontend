import React from "react";
import "../style.css";
import { Link } from 'react-router-dom';

const Gamenight2021 = () => {

    return (
        <div className='gamenight-container-two-col'>
            <div className="text">
                <h1>2021</h1>
                <p>Klicka på länken för att se ett inslag från SVT om LANet 2021.  </p>
                <Link to="https://www.svt.se/nyheter/lokalt/sormland/24-timmars-lan-i-eskilstuna" ><button>SVT BESÖKER LANET</button></Link >
            </div>
            <div className="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/U6sBna0Knhg?si=tBxrDPuM7uZ9gVRS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>            </div>
        </div>
    );
}

export default Gamenight2021;