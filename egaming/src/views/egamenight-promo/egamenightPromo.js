import React, { useState, useEffect } from "react";
import style from "./egamenightPromo.module.css";
import Lottie from 'lottie-react';
import arrow from '../../lotties/arrow.json';

const EgamenightPromo = () => {
    const eventDate = new Date("2025-02-17T00:00:00");
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

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
                        <Lottie animationData={arrow}
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

            <div>
                <h1>Tillsammans med UngFritid</h1>
            </div>
            {/* <div className={style.separator}></div> */}
        </div>
    );
};

export default EgamenightPromo;