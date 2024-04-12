import React from "react";
import "../style.css";
import { Link } from 'react-router-dom';

const Gamenight2022 = () => {

    return (
        <div className='gamenight-container-two-col'>
            <div className="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/OMkml8a2rWE?si=TSgFIgIJKTpUmeL7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div className="text">
                <h1>2022</h1>
                <p>Klicka på länken för att se ett inslag från SVT om LANet 2022.  </p>
                <Link to="https://www.svt.se/nyheter/lokalt/sormland/24-timmars-lan-i-eskilstuna" ><button>SVT BESÖKER LANET</button></Link >
            </div>
        </div>
    );
}

export default Gamenight2022;