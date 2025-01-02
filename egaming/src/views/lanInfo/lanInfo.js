import React from "react";
import Nav from "../../components/navbar/nav";
import EgameNights from "../../components/start/egameNights/egameNights";
import helpers from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

import './style.css';

const LanInfo = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/book');
    }
    const handleVisitor = () => {
        navigate('/event', { state: { visitor: true } })
    }
    helpers.scrollToTop();
    return (<>
        <Nav />
        <div>
            <div className="lan-info">
                <div className="info-data">
                    <h1 className="page-header">Lan Info</h1>
                    <p>Vår förening har under flera år hållit i ett årligt lanevent. Vi ser gärna att ni blir medlem i föreningen, det är kostnadsfritt och det gäller även lanet </p>
                    <p>När datumet för eventet närmar sig kommer ett schema med hamna här, med olika tävlingar och händelser på eventet</p>
                    <p>Alla platser bokas enskilt.</p>
                    <p>Vill du endast komma och hänga i hangoutdelen kan du boka en besöksbiljett!</p>
                </div>
                <button onClick={handleClick}>Boka din plats här</button>
                <button onClick={handleVisitor}>Boka en besöksbiljett</button>
            </div>
            {/* <div className="eventplan">
                <h1 className="page-header">2023</h1>
                <p>Det här är det tidigare eventets schema och några av de turneringarna som hölls då</p>
                <div className="content">
                    <img src="./images/Planritning.png" alt="Planritning 2023"></img>
                    <table className="schema">
                        <tr><th>Tid</th><th>Tournaments</th></tr>
                        <tr><td>15.00-16.00</td><td>Tekken</td></tr>
                        <tr><td>16.00-17.00</td><td>Fifa</td></tr>
                        <tr><td>13.30-19.45</td><td>CS:GO</td></tr>
                        <tr><td>16.30-20.45</td><td>CS:GO</td></tr>
                        <tr><td>21.00-23.00</td><td>Fortnite Score Racing</td></tr>
                    </table>
                </div>
            </div> */}
            <EgameNights />
        </div>
    </>
    );
}

export default LanInfo;