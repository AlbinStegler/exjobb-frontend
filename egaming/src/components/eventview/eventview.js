import React, { useState, useEffect } from 'react';
import style from './eventview.module.css';
import eventModel from '../../models/eventModel';
import { useNavigate } from 'react-router-dom';
import Nav from '../navbar/nav';
const EventView = () => {
    const [events, setEvents] = useState([]);
    const [seats, setSeats] = useState([]);
    const navigate = useNavigate();

    function handleClick(eventType) {
        if (eventType === "Lan") {
            navigate('/lanInfo');
        } else if (eventType === "OnSite") {
            // navigate('/discordInfo');
            alert("Eventen på plats behöver inte anmälan, kom bara förbi!");
        } else if (eventType === "Online") {
            navigate('/onsiteInfo');
        }
    }


    function calculateSeatsLeft(events) {
        let spots = [];

        events.forEach(element => {
            if (element.eventType === "Lan") {
                let nrSpots = 0;
                for (const row in element.seats) {
                    for (const seat in element.seats[row]) {
                        if (element.seats[row][seat] === "free") {
                            nrSpots++;
                        }
                    }
                }
                spots.push(nrSpots);
            } else {
                spots.push("Obegränsat");
            }
        });
        return spots;
    }

    useEffect(() => {
        const updateEvents = async () => {
            let res = await eventModel.getEvents();
            setEvents(res);
            setSeats(calculateSeatsLeft(res));
        }
        updateEvents();
    }, []);
    return (
        <div className={style.center} >
            <Nav />
            <div className={style.eventInfo}>
                <h1 className={style.pageHeader}>Kommande event</h1>
                <p>Här under är alla eventen som är inplanerade. Anmäl er gärna till eventet så vi vet hur många som kommer och för att bli medlem i föreningen.</p>
            </div>
            {
                events.map((event, index) => (
                    <div key={index} onClick={() => handleClick(event.eventType)} className={event.eventType === "Lan" ? `${style.smaller} ${style.eventRed}` : `${style.smaller} ${style.eventBlue}`}>
                        <h1>{event.eventName}</h1>
                        <p>{event.eventDescription}</p>
                        <div className={style.twoCol}>
                            <p>Platser kvar</p>
                            <p>{seats[index]}</p>
                        </div>
                        <div className={style.twoCol}>
                            <p>Datum</p>
                            <p>{event.eventDate.slice(0, 10)}</p>
                        </div>
                    </div>
                ))
            }
        </div >
    );
};
export default EventView;