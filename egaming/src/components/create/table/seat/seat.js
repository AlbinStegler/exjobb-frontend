import React, { useState } from 'react';
import userModel from '../../../../models/userModel';
import 'animate.css';
import './style.css'

const Seat = ({ seatInfo, onSeatClick, isBooked }) => {
    const nr = seatInfo.nr;
    const row = seatInfo.row;
    let className = `seat ${isBooked}`;

    const [nick, setNick] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    async function clickHandler(e) {

        if (isBooked === "booked") {
            return;
        }
        onSeatClick(seatInfo);
        let selected = document.querySelectorAll('.selected');
        if (selected.length > 0) {
            selected.forEach(seat => {
                seat.classList.remove('selected');
            });
        }
        e.target.parentNode.classList.toggle('selected');
        let button = document.getElementById('confirm');

        if (button) {
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                button.classList.add("animate__animated", "animate__pulse");
                setTimeout(() => {
                    button.classList.remove("animate__animated", "animate__pulse");
                }
                    , 1000);
            }, 100);
        }
    }

    async function handleDoubleClick(e) {
        setShowPopup(true);
        if (isBooked === "booked") {
            const seat = { "row": row, "seat": nr.toString() }
            let nickname = await userModel.getUserFromSeat(seat)
            setNick(nickname.member.member_nick);
            console.log(nickname.member.member_nick);
        }

    }

    return (
        <>
            {showPopup && (
                <div className="popup">
                    <h1>Plats {row}{nr} bokad för</h1>
                    <h2>{nick}</h2>
                    <button onClick={handleClosePopup}>Close</button>
                </div>
            )}
            <div className={className} onClick={e => clickHandler(e)} onDoubleClick={handleDoubleClick}>
                <p>{seatInfo.nr}</p>
            </div>
        </>
    );
};

export default Seat;
