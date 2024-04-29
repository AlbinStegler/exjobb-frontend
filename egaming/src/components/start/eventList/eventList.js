import React, { useState, useEffect } from 'react';
import './style.css';
import eventModel from '../../../models/eventModel';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            let events = await eventModel.getEvents();
            setEvents(events);
        };

        fetchEvents();
    }, []);

    const handleMouseDown = (e) => {
        setDragging(true);
        setStartX(e.pageX - e.currentTarget.offsetLeft);
        setScrollLeft(e.currentTarget.scrollLeft);
    };

    function handleMouseClick(eventType) {
        if (eventType === "Lan") {
            navigate(`/lanInfo`);
        }
        if (eventType === "OnSite") {
            navigate(`/events`);
        }
        if (eventType === "Online") {
            navigate(`/discordInfo`);
        }
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        e.preventDefault();

        const x = e.pageX - e.currentTarget.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scrolling speed

        // Check if the movement is primarily horizontal
        const isHorizontalMovement = Math.abs(e.movementX) > Math.abs(e.movementY);

        if (isHorizontalMovement) {
            e.currentTarget.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div className='event-list'>
            <h1>Kommande Event</h1>
            <div className="scroll-list"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}>
                {events.map((event) => {
                    return (
                        <div className={event.active ? "scroll-list-item list-active" : "scroll-list-item inactive"}
                            key={event.id}
                            onClick={event.active ? () => handleMouseClick(event.eventType) : null}>
                            <h1>{event.eventName}</h1>
                            <div className='two-col time'><p>Tid: {event.eventTime}</p><p>Datum: {event.eventDate.slice(0, 10)}</p></div>
                            <div className='desc'>
                                <h3>Plats: </h3>
                                <p>{event.eventLocation}</p>
                            </div>
                            <div className='desc'>
                                <h3>Beskrivning:</h3>
                                {event.eventDescription ? <p>{event.eventDescription}</p> : null}
                            </div>
                        </div>
                    );
                })}
                {/* Fake items for demonstration */}
                <div className="scroll-list-item inactive">
                    <h1>EgameNight 2023</h1>
                    <div className='two-col'><p>Tid:Kl 11</p><p>Datum: 2023-10-31</p></div>

                    <div className='desc'>
                        <h3>Plats: </h3>
                        <p>Lokomotivet</p>
                    </div>
                    <div className='desc'>
                        <h3>Beskrivning:</h3>
                        <p>Föreningens årliga lan i Lokomotivet</p>
                    </div>

                </div>
                <div className="scroll-list-item inactive">
                    <h1>EgameNight 2022</h1>
                    <div className='two-col'><p>Tid:Kl 11</p><p>Datum: 2022-10-31</p></div>

                    <div className='desc'>
                        <h3>Plats: </h3>
                        <p>Lokomotivet</p>
                    </div>
                    <div className='desc'>
                        <h3>Beskrivning:</h3>
                        <p>Föreningens årliga lan i Lokomotivet</p>
                    </div>

                </div>
                <div className="scroll-list-item inactive">
                    <h1>EgameNight 2020</h1>
                    <div className='two-col'><p>Tid:Kl 11</p><p>Datum: 2020-10-31</p></div>

                    <div className='desc'>
                        <h3>Plats: </h3>
                        <p>Lokomotivet</p>
                    </div>
                    <div className='desc'>
                        <h3>Beskrivning:</h3>
                        <p>Föreningens årliga lan i Lokomotivet</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventList;
