import React, { useState, useEffect } from "react";
import style from "./egamenightPromo.module.css";
import Lottie from 'lottie-react';
import arrow from '../../lotties/arrow.json';
import { useNavigate } from "react-router-dom";

const EgamenightPromo = () => {
    const eventDate = new Date("2025-02-17T00:00:00");
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const navigate = useNavigate();
    function calculateTimeLeft() {
        const difference = eventDate - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });


    function handleClick() {
        document.getElementById("#info").scrollIntoView();
    }

    function navigateTo() {
        navigate("/lanInfo");
    }

    return (
        <div className={style.EgamenightPromo}>
            {/* <div className={style.content}>
                <h1>What is this event</h1>
                </div> */}
            <div className={style.first}>

                <div className={style.countdown}>
                    <h1>E-GameNight 2025</h1>
                    {timeLeft.days !== undefined ? (
                        <p>
                            {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M {timeLeft.seconds}S
                        </p>
                    ) : (
                        <p>Event has started!</p>
                    )}
                    <button className={style.boka} onClick={handleClick}>Boka din plats</button>
                    <div className={style.info}>
                    <p>Info</p>
                        <Lottie animationData={arrow} onClick={handleClick} className={style.arrow}
                            loop
                            autoPlay
                            style={{ width: "100px", height: "100px" }}
                        />
                    </div>
                </div>
            </div>
            <div id="#info" className={style.hero}>
                <img src="images/Banner.png" className={style.whitefilter} alt="EtownGaming" />
                <img src="images/Ung Fritid_logga_vit.png" alt="UngFritid" className={style.ung}/>
            </div>

            <div className={style.info1}>
                <div className={style.info2text}>
                    <h3>Välkommen till E-Game Night på Lokomotivet!</h3>
                    <p>
                        Är du redo för två dagar fyllt med gaming, gemenskap och spännande utmaningar? Då är E-Game Night, arrangerat av E-Town Gaming och Ung fritid, evenemanget för dig!
                    </p>
                    <ul>
                        <li>När: 18-19 februari</li>
                        <li>Var: Lokomotivet, Verkstadsgatan 8, Eskilstuna</li>
                        <li>Tid: Portarna öppnar 11.00 den 18 februari och lanet avslutas 12.00 den 19 februari.</li>
                    </ul>
                    <h3>Vad kan du förvänta dig?</h3>
                    <ul>
                        <li>Non-stop gaming: Dyk in i dina favoritspel tillsammans med andra gamingentusiaster.</li>
                        <li>Trevlig atmosfär: Häng med nya och gamla vänner i en avslappnad och social miljö.</li>
                        <li>Tävlingar och turneringar: Chansen att tävla mot andra och visa upp dina färdigheter.</li>
                        <li>Massor av roliga aktiviteter: Utöver gaming blir det andra roliga aktiviteter som du inte vill missa.
                            Begränsat antal platser!</li>
                    </ul>

                    <p>Det finns totalt 64 LAN-platser och 50 besöksplatser, så se till att boka din plats i tid!</p>
                </div>

            </div>
            <div className={style.countdown}>
                <button className={style.boka} onClick={navigateTo}>Boka här</button>
            </div>
            {/* <div className={style.separator}></div> */}
        </div>
    );
};

export default EgamenightPromo;